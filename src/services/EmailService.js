import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const loggedinUser = {
    email: 'galor@gmail.com',
    fullname: 'Gal Or'
}

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getFilterFromParams,
    getUnreadCount,
    loggedinUser
}

const STORAGE_KEY = 'emails'



_createEmails()

async function query(filterBy) {
    console.log("filter in query", filterBy);
    let emails = await storageService.query(STORAGE_KEY)
    console.log("before filter", emails);
    if (filterBy) {
        emails = filterEmails(emails, filterBy)
        console.log("after filter", emails);

    }


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
            return filteredEmails.filter(email => email.to === loggedinUser.email && !email.removedAt)
        case 'sent':
            return filteredEmails.filter(email => email.from === loggedinUser.email && !email.removedAt)
        case 'starred':
            return filteredEmails.filter(email => email.isStarred && !email.removedAt)
        case 'drafts':
            return filteredEmails.filter(email => !email.sentAt && !email.removedAt)
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
                subject: 'Yum Tov!',
                body: 'We should never meet :(',
                isRead: true,
                isStarred: false,
                sentAt: Date.now(),
                removedAt: null,
                from: 'koko@gmail.com',
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
                to: 'nofar@gmail.com'
            }, {
                id: 'e3',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes Would love to catch up sometimes Would love to catch up sometimes Would love to catch up sometimes  ',
                isRead: true,
                isStarred: false,
                sentAt: 1677500285,
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'noy@gmail.com'
            }, {
                id: 'e4',
                subject: 'Love you!',
                body: 'We must to catch up sometimes',
                isRead: true,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'dodi@gmail.com',
                to: 'galor@gmail.com'
            }, {
                id: 'e5',
                subject: 'Hate you!',
                body: 'We should never meet :(',
                isRead: false,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'sozi@gmail.com',
                to: 'galor@gmail.com'
            }, {
                id: 'e6',
                subject: 'Good Luck!',
                body: 'We should never meet :(',
                isRead: true,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'shalom@gmail.com'
            }, {
                id: 'e7',
                subject: 'Shalom!',
                body: 'We should never meet :(',
                isRead: true,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'galor@gmail.com',
                to: 'kobi@gmail.com'
            }, {
                id: 'e8',
                subject: 'Mazal Tov!',
                body: 'We should never meet :(',
                isRead: false,
                isStarred: false,
                sentAt: 1709043485,
                removedAt: null,
                from: 'avi@gmail.com',
                to: 'galor@gmail.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter(folder) {
    return {
        // folder: folder ? folder : 'inbox',
        folder: 'inbox',
        txt: '',
        isRead: null
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter)
        filterBy[field] = searchParams.get(field) || defaultFilter[field]

    console.log("filterBy in get filter", filterBy);
    return filterBy
}

async function getUnreadCount() {

    let emails = await query({ folder: 'inbox', txt: '', isRead: 'false' })
    return emails.length
}

