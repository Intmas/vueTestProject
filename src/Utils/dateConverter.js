export default class Utils{
  getDateFormat(date, format)  {
    let dateObj = new Date(date)
    let dd = this.addZero(dateObj.getDate())
    let mm = this.addZero(dateObj.getMonth() + 1)
    let yyyy = dateObj.getFullYear()
    if(format === 'ru'){
      return dd + '.' + mm + '.' + yyyy
    } else {
      return mm + '/' + dd + '/' + yyyy
    }

  }
  getDateInputFormat(date)  {
    let dateObj = new Date(date)
    let dd = this.addZero(dateObj.getDate())
    let mm = this.addZero(dateObj.getMonth() + 1)
    let yyyy = dateObj.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }
  addZero(number){
    if(number < '10') number = '0' + number
    return number
  }
  getTest(){
    return "i am working!"
  }
}
