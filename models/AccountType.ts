/**
 * @file AccountType data type represents the type of User's account.
 */

/**
 * @class AccountType represents all account type of the Tuiter UserAccount.
 * @property {string} Personal a personal account
 * @property {string} Academic an academic account
 * @property {string} Professional a professional account
 */
enum AccountType {
    Personal = 'PERSONAL',
    Academic = 'ACADEMIC',
    Professional = 'PROFESSIONAL'
}
export default AccountType;