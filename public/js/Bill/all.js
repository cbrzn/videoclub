element = id => document.getElementById(id)

const showBilled = () => {
    fetch('./bill/all', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        const tbody = element('table')
        for (var i in result.bills) {
            const { person_id, total, date, status, bill_id } = result.bills[i]
            const tr = document.createElement('tr')
            const bill = document.createElement('th')
            const amount = document.createElement('td')
            const payday = document.createElement('td')
            const stat = document.createElement('td')
            const details = document.createElement('td')
            
            const billing_date = date.substring(0, date.indexOf('T'))
            const just_date = billing_date.split('-').reverse().join('-')

            bill.innerHTML = person_id
            bill.setAttribute('scope', 'row')
            amount.innerHTML = total
            payday.innerHTML = just_date
            stat.innerHTML = status
            details.innerHTML = 'Ver'

            tr.appendChild(bill)
            tr.appendChild(amount)
            tr.appendChild(payday)
            tr.appendChild(stat)
            tr.appendChild(details)

            details.addEventListener('click', () => {
                window.location.href = `/order-detail.html?id=${bill_id}`
            })

            tbody.appendChild(tr)
        }
    })   
}

addEventListener('load', showBilled)