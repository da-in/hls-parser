import * as fs from 'fs'
import path from 'node:path'
import {describe, it, expect} from '@jest/globals'
import parse from '../parse'

const loadFile = (file: string) => {
    const _path = path.join(__dirname, './', file)
    return fs.readFileSync(_path, 'utf8')
}

describe('parse', () => {
    it('parse master playlist', () => {
        const m3u8 = loadFile('./skate_phantom_flex_4k.m3u8')
        const playlist = parse(m3u8)
        expect(playlist?.type).toBe('MasterPlaylist')
        expect(playlist).toMatchSnapshot()
    })
    it('parse media playlist', () => {
    })
})
