import {Playlist, TAG} from './types';

/**
 * @param text m3u8 string
 */
const parse = (text: string): Partial<Playlist> | undefined => {
    const playlist = {}
    const tags: TAG[] = []
    const lines = text.split('\n').map((line) => line.trim())
    let type

    // not a extended m3u
    if(lines[0] !== '#EXTM3U'){
        return
    }

    for (let i = 1; i < lines.length; i++){
        const line = lines[i]
        const re: RegExp = /#([A-Z0-9-]+):?([\w\d=,-]+)?/
        const match = line.match(re)

        if(!match){
            continue
        }

        const name = match[1]
        const attributes = parseAttributes(match[2])

        switch(name){
            // master playlist: 동일한 컨텐츠에 대해 다른 인코딩 버전을 제공
            case 'EXT-X-MEDIA': // 다른 유형의 미디어(오디오, 비디오, 자막)와 추가 정보
            case 'EXT-X-STREAM-INF': // 다른 변형 스트림(Variant Stream)
            case 'EXT-X-I-FRAME-STREAM-INF':
            case 'EXT-X-SESSION-DATA':
            case 'EXT-X-SESSION-KEY':
                type = 'MasterPlaylist'
        }

        tags.push({
            name,
            attributes,
        })
    }

    // master playlist tags

    // #EXT-X-MEDIA
    // #EXT-X-STREAM-INF
    // #EXT-X-I-FRAME-STREAM-INF
    // #EXT-X-SESSION-DATA
    // #EXT-X-SESSION-KEY

    Object.assign(playlist, {type, tags})
    return playlist
}

/**
 * @param attributesText attributes string separated with ','
 */
const parseAttributes = (attributesText: string): TAG['attributes'] => {
    const result: Record<string, string> = {}
    attributesText.split(',').map((attribute) => {
        const [key, value] = attribute.split('=')
        result[key] = value
    })
    return result
}

export default parse
