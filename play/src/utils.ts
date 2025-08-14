export const getDefaultParams = (func: any) => {
  if (!func.paramSchema) return {}

  const defaultParams: Record<string, any> = {}
  func.paramSchema.forEach((param: any) => {
    if (param.defaultValue !== undefined) {
      defaultParams[param.name] = param.defaultValue
    }
  })

  return defaultParams
}
