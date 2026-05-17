import copyText from './copyText'

const copyLink = async (url: string, title?: string): Promise<boolean> => copyText(title ? `${title}\n${url}` : url)

export default copyLink
