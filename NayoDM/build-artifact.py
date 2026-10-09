"""Build the single-file artifact preview from the deployable page.

The deployed page loads animation/*.svg and assets/*.png from disk; the artifact
is one file, so inline the SVGs and embed the icon as a data URI.
"""
import base64
import io
import re

SRC = 'index.html'
OUT = ('C:/Users/work/AppData/Local/Temp/claude/'
       'C--Users-work-Desktop-n-dev-Damien-Tool-NayoTechnologies-DamienTool-Cloud/'
       '92ae6460-576b-4ecf-a647-842665f3f0ac/scratchpad/nayodm-page.html')

s = io.open(SRC, encoding='utf-8').read()


def inline_svg(m):
    path, alt = m.group(1), m.group(2)
    svg = io.open(path, encoding='utf-8').read()
    svg = svg.replace('<svg xmlns="http://www.w3.org/2000/svg" ', '<svg ')
    return svg.strip()


s = re.sub(r'<img src="(animation/[\w-]+\.svg)" alt="([^"]*)"[^>]*>', inline_svg, s)

icon = base64.b64encode(io.open('assets/nayodm-icon.png', 'rb').read()).decode()
s = s.replace('assets/nayodm-icon.png', 'data:image/png;base64,' + icon)

head = re.search(r'<head>(.*?)</head>', s, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', s, re.S).group(1)
head = re.sub(r'<meta[^>]*>\s*', '', head)
io.open(OUT, 'w', encoding='utf-8').write(head.strip() + '\n\n' + body.strip() + '\n')
print('artifact built:', len(head) + len(body), 'chars')
