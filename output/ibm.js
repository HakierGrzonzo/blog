console.log()
document.getElementById('days-since').innerHTML = Math.floor((new Date().getTime() - new Date('2021-11-05').getTime()) / (1000 * 60 * 60 * 24))
document.getElementById('times-since').innerHTML = Math.round((new Date().getTime() - new Date('2021-11-05').getTime()) / (1000 * 60 * 60 * 24 * 12) * 100) / 100
