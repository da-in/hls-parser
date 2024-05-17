type PlaylistType = 'MasterPlaylist' | 'MediaPlaylist' | 'MediaSegment'
export interface Playlist {
    type: PlaylistType
    tags: TAG[]
}

export interface MasterPlaylist extends Playlist {
    type: 'MasterPlaylist'
    tags: (EXT_X_MEDIA | EXT_X_STREAM_INF)[]
}

export interface MediaPlaylist extends Playlist {
    type: 'MediaPlaylist'
}

export interface MediaSegment extends Playlist {

}

// 렌디션(Rendition): 특정 미디어 스트림의 다양한 버전 (해상도, 비트레이트, 오디오 언어 및 형식 등)
export interface TAG {
    name: string,
    attributes: Record<string, string | number>
}

interface EXT_X_MEDIA extends TAG { // 대체 렌디션 연결
    name: 'EXT-X-MEDIA'
    attributes: {
        'TYPE': 'AUDIO' | 'VIDEO' | 'SUBTITLES' | 'CLOSED-CAPTIONS'
        'URI'?: string
        'GROUP-ID': string // 렌디션 그룹
        'LANGUAGE'?: string
        'ASSOC-LANGUAGE'?: string // Language 외 연관된 언어를 지정
        'NAME': string // 해당 렌디션을 식별할 수 있는 이름, Language를 지정한 경우 반드시 해당 언어로 작성
        'DEFAULT'?: 'YES' | 'NO' // 사용자가 명시적으로 선택하지 않을 경우 기본 재생
        'AUTOSELECT'?: 'YES' | 'NO' // 사용자 환경 설정에 따라 자동 선택할 렌디션, Default가 참이라면 AutoSelect도 반드시 참
        'FORCED'?: 'YES' | 'NO' // Type SUBTITLES인 경우에만 지정
        'INSTREAM-ID'?: string // Type CLOSED-CAPTIONS인 경우 필수, 그 외 작성 불가, CC1, CC2, CC3, CC4, SERVICEn (n: 1~63 정수)
        'CHARACTERISTICS'?: string // Uniform Type Identifiers
        'CHANNELS'?: string // Audio 렌디션의 채널 구성을 지정, 2: 2채널 스테레오, 6: 5.1 서라운드, 2/1: 2채널 스테레오에 하나의 추가 채널
    }
}

interface EXT_X_STREAM_INF extends TAG { // 변환 렌디션 정의
    name: 'EXT-X-STREAM-INF'
    attributes: {
        'BANDWIDTH': number // 대역폭, 최대 피크 비트 전송률
        'AVERAGE-BANDWIDTH'?: number // 최대 합의 평균이어야 함
        'CODECS': string
        'RESOLUTION'?: number // 해상도
        'FRAME-RATE'?: number // 초당 프레임 수(fps)
        'HDCP-LEVEL'?: 'TYPE-0' | 'TYPE-1' | 'NONE' // High-bandwidth Digital Content Protection
        'ALLOWED-CPC'?: string // 콘텐츠 보호 강도 지정을 통한 클라이언트 재생 제한
        'VIDEO-RANGE'?: 'SDR' | 'HLG' | 'PQ'
        'AUDIO'?: string // EXT-X-MEDIA 태그의 GROUP-ID와 일치해야 함
        'VIDEO'?: string // EXT-X-MEDIA 태그의 GROUP-ID와 일치해야 함
        'SUBTITLES'?: string // EXT-X-MEDIA 태그의 GROUP-ID와 일치해야 함
        'CLOSED-CAPTIONS'?: string | 'NONE' // NONE이 아닌 경우 EXT-X-MEDIA 태그의 GROUP-ID와 일치해야 함
    }
    uri: string
}
