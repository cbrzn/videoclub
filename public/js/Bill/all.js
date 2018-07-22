element = id => { 
    return document.getElementById(id)
}

const showBilled = () => {
    fetch('./bill/all')
    .then(response => response.json())
    .then(result => {
        const tbody = element('table')
        for (var i in result.bills) {
            const { person_id, total, date, status } = result.bills[i]
            const tr = document.createElement('tr')
            const bill = document.createElement('th')
            const amount = document.createElement('td')
            const payday = document.createElement('td')
            const stat = document.createElement('td')
            const details = document.createElement('td')
            
            bill.innerHTML = person_id
            bill.setAttribute('scope', 'row')
            amount.innerHTML = total
            payday.innerHTML = date
            stat.innerHTML = status
            details.innerHTML = 'Ver'

            tr.appendChild(bill)
            tr.appendChild(amount)
            tr.appendChild(payday)
            tr.appendChild(stat)
            tr.appendChild(details)

            tbody.appendChild(tr)
        }
    })   
}

addEventListener('load', showBilled)