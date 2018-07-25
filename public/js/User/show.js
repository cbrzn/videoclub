element = id => document.getElementById(id)

const loadUser = () => {
    fetch('/bill/by_user', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        const { name, location, email } = result.user
        element('name').value = name
        element('email').value = email
        element('location').value = location

        const tbody = element('table')
        for (var i in result.bills) {
            const { bill_id, date, total, status } = result.bills[i]
            const tr = document.createElement('tr')
            const id = document.createElement('th')
            const dat = document.createElement('td')
            const tot = document.createElement('td')
            const stat = document.createElement('td')

            id.innerHTML = bill_id
            const billing_date = date.substring(0, date.indexOf('T'))
            const just_date = billing_date.split('-').reverse().join('-')
            dat.innerHTML = just_date
            tot.innerHTML = total
            stat.innerHTML = status

            tr.appendChild(id)
            tr.appendChild(dat)
            tr.appendChild(tot)
            tr.appendChild(stat)

            tbody.appendChild(tr)
        }
    })
}

addEventListener('load', loadUser)