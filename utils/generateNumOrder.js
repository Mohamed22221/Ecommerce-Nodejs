const generateNumOrder = () =>{
    const randomTxt = Math.random().toString(20).toString(7).toLocaleUpperCase()
    const randomNumber = Math.floor(1000 + Math.random() * 9000)
    return randomTxt + randomNumber
} 
export default generateNumOrder