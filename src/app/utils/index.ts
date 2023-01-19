export const toString = (unknown: unknown) => {
    if (!unknown) return null

    return typeof unknown === 'string' || unknown instanceof String
        ? unknown
        : unknown.toString()
}

export const stringify = (obj: any) => {
    return JSON.stringify(obj)
}

export const parse = (obj: any) => {
    return JSON.parse(obj)
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const isValidQuery = query => {
    const sanitizedQuery = query.replace(/(\r\n|\n|\r)/gm, '')
    return sanitizedQuery !== ''
}

export const extractAzzuracyPercentage = text => {
    const sanitizedText = text.split('****')[1]
    if (!sanitizedText) return 0
    const accuracy = Number(sanitizedText.replaceAll(/#|%/gi, ''))
    return isNaN(accuracy) ? 0 : accuracy
}
