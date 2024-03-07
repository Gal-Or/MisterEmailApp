import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter
}

const STORAGE_KEY = 'emails'

const loggedinUser = {
    email: 'galor@gmail.com',
    fullname: 'Gal Or'
}

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy)
        emails = filterEmails(emails, filterBy)

    return emails
}

function filterEmails(emails, filterBy) {

    const { folder, txt, isRead } = filterBy
    let filteredEmails

    if (txt != '')
        filteredEmails = emails.filter(email => isMatchToTxt(email, txt))
    else
        filteredEmails = emails

    switch (isRead) {
        case 'true':
            filteredEmails = filteredEmails.filter(email => email.isRead)
            break;
        case 'false':
            filteredEmails = filteredEmails.filter(email => !email.isRead)
            break
        default:
            filteredEmails = filteredEmails
    }
    switch (folder) {
        case 'inbox':
            return filteredEmails.filter(email => email.to === loggedinUser.email)
        case 'sent':
            return filteredEmails.filter(email => email.from === loggedinUser.email)
        case 'starred':
            return filteredEmails.filter(email => email.isStarred)
        case 'drafts':
            return filteredEmails.filter(email => !email.sentAt)
        case 'trash':
            return filteredEmails.filter(email => email.removedAt)
    }
}

function isMatchToTxt(email, txt) {

    return (
        (email.from.toLowerCase().includes(txt.toLowerCase()) ||
            email.subject.toLowerCase().includes(txt.toLowerCase()) ||
            email.body.toLowerCase().includes(txt.toLowerCase())))
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}


function createEmail(subject, body = '', isRead = false,
    isStarred = false, sentAt, removedAt = null, from, to) {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function _createEmails() {
    let date = new Date()
    date.setDate(date.getDate() - 1);

    let emails = utilService.loadFromStorage(STORAGE_KEY)

    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e1',
                subject: 'Hate you!',
                body: 'We should never meet :(',
                isRead: true,
                isStarred: false,
                sentAt: Date.now(),
                removedAt: null,
                from: 'momo@momo.com',
                to: 'galor@gmail.com'
            }, {
                id: 'e2',
                subject: 'Hey',
                body: 'How are you?',
                isRead: true,
                isStarred: false,
                sentAt: (date),
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'user@appsus.com'
            }, {
                id: 'e3',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes Would love to catch up sometimes Would love to catch up sometimes Would love to catch up sometimes  ',
                isRead: true,
                isStarred: false,
                sentAt: 1677500285,
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'user@appsus.com'
            }, {
                id: 'e4',
                subject: 'Love you!',
                body: 'We must to catch up sometimes',
                isRead: true,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'bobo@bobo.com',
                to: 'galor@gmail.com'
            }, {
                id: 'e5',
                subject: 'Hate you!',
                body: 'We should never meet :(',
                isRead: false,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'galor@gmail.com'
            }, {
                id: 'e6',
                subject: 'Hate you!',
                body: 'We should never meet :(',
                isRead: true,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'user@appsus.com'
            }, {
                id: 'e7',
                subject: 'Hate you!',
                body: 'We should never meet :(',
                isRead: true,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'user@appsus.com'
            }, {
                id: 'e8',
                subject: 'Hate you!',
                body: 'We should never meet :(',
                isRead: false,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'galor@gmail.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter(folder) {
    return {
        folder: folder ? folder : 'inbox',
        txt: '',
        isRead: null
    }
}