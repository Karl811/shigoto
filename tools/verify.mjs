// Portable structural check. No network, install, secrets or learner data.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function requireFile(ref,from){if(/^(?:https?:|data:|blob:|#)/.test(ref)||ref.includes('var('))return;let f=path.resolve(path.dirname(from),ref.split(/[?#]/)[0]);if(!f.startsWith(root+path.sep)||!fs.existsSync(f))throw Error('Missing/unsafe reference '+ref+' in '+path.relative(root,from));}
const all=files(root);if(all.length>=100)throw Error('Package contains '+all.length+' files; review the upload package.');
for(const file of all){if(/\.(?:html|css)$/.test(file)){let text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/(?:src|href)="([^"<>]+)"/g))requireFile(m[1],file);for(const m of text.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g))requireFile(m[1],file);}if(/\.m?js$/.test(file)){let r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr);}}
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');const core=JSON.parse(sw.match(/const CORE=(\[[\s\S]*?\])\.map/)[1]);for(const f of core)requireFile(f,path.join(root,'sw.js'));if(new Set(core).size!==core.length)throw Error('Repeated CORE resource');
const build=sw.match(/const VERSION='([^']+)'/)[1];for(const f of ['index.html','habit-game.html'])for(const m of fs.readFileSync(path.join(root,f),'utf8').matchAll(/[?&]v=([^"'<>]+)/g))if(m[1]!==build)throw Error('Cache build mismatch: '+f+' '+m[1]);
console.log(JSON.stringify({ok:true,files:all.length,offlineResources:core.length,cacheBuild:build,scope:'structure, references, JavaScript syntax; not browser behavior'},null,2));
