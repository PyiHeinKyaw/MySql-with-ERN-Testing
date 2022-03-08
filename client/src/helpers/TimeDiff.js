import Moment from 'moment'

export const TimeDiff = props => {

    let { time } = props

    let diff = Moment().format('H') - Moment(time).format('H')

    const checkHour = diff => {
        return diff === 1 ? 'hour' : 'hours'
    }

    if (diff < 24) {
        return `${diff} ${checkHour()} ago`
    }
}
