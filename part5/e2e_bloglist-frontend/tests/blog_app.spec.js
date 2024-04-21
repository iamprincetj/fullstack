const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginUser, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/tests/reset')
        await request.post('/api/users', {
            data: {
                username: 'Prince',
                name: 'Justin',
                password: '12345678'
            }
        })

        await request.post('/api/users', {
            data: {
                username: 'Kingson',
                name: 'James',
                password: '12345678'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('log in to application')
        const loginBtn =  page.getByRole('button', { name: 'login' })
        await expect(locator).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(loginBtn).toBeVisible()
    })

    describe('Login', () => {

        test('succeeds with correct credentials', async ({ page }) => {
            await loginUser(page, 'Prince', '12345678')

            const locator = page.getByText('Justin logged in')

            await expect(locator).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginUser(page, 'Prince TJ', '12345678')

            const locator = page.locator('.notify')

            await expect(locator).toContainText('invalid username or password')
        })
    })

    describe( 'When logged in' ,() => {
        beforeEach( async ({ page }) => {
            await loginUser(page, 'Prince', '12345678')
        })


        test('a new blog can be created', async ({ page }) => {

            await createBlog(page, 'watching anime 🥹', 'https://animepahe.ru', 'Justin')

            const locator = page.locator('.notify')
            await expect(locator).toContainText('a new blog watching anime 🥹 by Justin added')
            await expect(page.getByText('watching anime 🥹 Justin')).toBeVisible()
        })

        describe('blogs', () => {
            beforeEach( async ({ page, request }) => {
                await createBlog(page, 'watching anime 🥹', 'https://animepahe.ru', 'Justin')
            })


            test('can be edited',  async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()

                await page.getByRole('button', { name: 'like' }).click()
                

                await expect(page.getByText('likes 1')).toBeVisible()
            })

            test('who added the blog can delete it', async ({ page }) => {
                const blogElement = page.getByText('watching anime 🥹 Justin')
                await blogElement.getByRole('button', { name: 'view' }).click()
                page.on('dialog', async dialog => {
                  await dialog.accept()
                })
                await page.getByRole('button', { name: 'remove' }).click()

                await expect(blogElement).not.toBeVisible()
            })

            test('only user who added the blog sees the delete button', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()

                await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
                await page.getByRole('button', { name: 'logout' }).click()

                await loginUser(page, 'Kingson', '12345678')

                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.getByText('James logged in')).toBeVisible()
                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
            })

            test('blogs are arranged in the order according to the likes', async ({ page }) => {
                await createBlog(page, 'reading 😔', 'https://reading.com', 'Justin')
                const blogs = page.getByText('reading 😔 Justin')
                const firstBlog = page.locator('.blog').first()
                const secondBlog = page.locator('.blog').last()
                await expect(firstBlog).toContainText('watching anime 🥹 Justin')
                await expect(secondBlog).toContainText('reading 😔 Justin')

                await blogs.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'hide' }).click()

                // now the order of the blogs changed, this is because the second blog 'like' incresed by one
                await expect(firstBlog).toContainText('reading 😔 Justin')
                await expect(secondBlog).toContainText('watching anime 🥹 Justin')
            })
        })
    })
})