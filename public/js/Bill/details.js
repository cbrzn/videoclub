element = id => document.getElementById(id)

const actual_url = window.location.href
const url = new URL(actual_url)
const id = url.searchParams.get('id')

const showOrder = () => {

    fetch(`/bill/show`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
        const { bill_id, date, payment_form, name, status, total } = result.bill
       
        const billing_date = date.substring(0, date.indexOf('T'))
        const just_date = billing_date.split('-').reverse().join('-')
       
        element('idorder').setAttribute('value', bill_id)
        element('clientname').setAttribute('value', name)
        element('date').setAttribute('value', just_date)
        element('total').setAttribute('value', total)
        element('status').setAttribute('value', status)

    })
}

const updateOrder = () => {
    fetch('/bill/update', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
        alert('Orden actualizada')
        window.location.href = `/order-detail.html?id=${id}`
    })
}

element('update').addEventListener('click', updateOrder)
addEventListener('load', showOrder)