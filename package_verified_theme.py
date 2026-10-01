"""Package the reviewed WordPress theme without overwriting it from explore/."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import re
import shutil

root = Path(__file__).resolve().parent
theme = root / 'wordpress-theme' / 'speego-logistics'
version = re.search(r'^Version:\s*(\S+)', (theme / 'style.css').read_text(encoding='utf-8'), re.M)[1]
output = root / f'speego-logistics-theme-v{version}.zip'
temporary = output.with_suffix('.zip.tmp')
files = sorted(p for p in theme.rglob('*') if p.is_file())
with ZipFile(temporary, 'w', ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file, 'speego-logistics/' + file.relative_to(theme).as_posix())
with ZipFile(temporary) as archive:
    assert archive.testzip() is None, 'Corrupt ZIP entry'
    assert len(archive.namelist()) == len(files)
    for file in files:
        assert archive.read('speego-logistics/' + file.relative_to(theme).as_posix()) == file.read_bytes(), file
temporary.replace(output)
shutil.copyfile(output, root / 'speego-logistics-vercel-parity.zip')
digest = hashlib.sha256(output.read_bytes()).hexdigest()
output.with_suffix('.zip.sha256').write_text(f'{digest}  {output.name}\n', encoding='ascii')
print(f'{output}\n{len(files)} entries, {output.stat().st_size:,} bytes\nSHA256 {digest}')
