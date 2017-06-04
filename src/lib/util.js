import _ from 'lodash'
import { format } from 'currency-formatter'

function format$ (amount) {
  return format(amount, { code: 'USD' }).replace(/\.\d+$/, '')
}

function newId (itemsWithIds) {
  return (_(itemsWithIds).map('id').sort().last() || 0) + 1
}

function percentToAmount (total, percent) {
  return toTwoDecimals(total * (percent / 100))
}

function rounded (amount, max, barMax) {
  const roundToNearest = (
    barMax > 20000 ? 100 :
    barMax > 5000 ? 50 :
    10
  )
  const roundedAmount = Math.round(amount / roundToNearest) * roundToNearest
  return roundedAmount > max ? max : roundedAmount
}

function toTwoDecimals (amount) {
  return Number((amount).toFixed(2))
}

export default {
  format$,
  newId,
  percentToAmount,
  rounded,
  toTwoDecimals,
}
