# utils

## getInfoByIdCard

根据身份证获取生日、性别、年龄

```typescript
/**
 * 根据身份证获取生日、性别、年龄
 * @param idCard
 * @returns {{birthday: string, isMan: boolean, age:number}|boolean}
 */
export const getInfoByIdCard = (idCard: string): { birthday: string; isMan: boolean; age: number } | boolean => {
  const getBirthDay = (birthStr: string) => {
    return `${birthStr.substring(0, 4)}-${birthStr.substring(4, 6)}-${birthStr.substring(6, 8)}`
  }
  const getBirthYear = (birthStr: string) => {
    return `${birthStr.substring(0, 4)}` // 获取出生年份
  }
  const isMan = (sexNumb: string) => {
    return !(Number(sexNumb) % 2 === 0) // 男
  }
  if (/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/.test(idCard)) {
    return {
      birthday: getBirthDay(`19${idCard.substring(6, 12)}`),
      isMan: isMan(idCard.substring(14, 15)),
      age: Number(new Date().getFullYear()) - Number(getBirthYear(`19${idCard.substring(6, 12)}`)),
    }
  } else if (
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCard)
  ) {
    return {
      birthday: getBirthDay(idCard.substring(6, 14)),
      isMan: isMan(idCard.substring(16, 17)),
      age: Number(new Date().getFullYear()) - Number(getBirthYear(idCard.substring(6, 14))),
    }
  }
  return false
}
```
