/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    //    Tests for RSS Feeds
    describe('RSS Feeds', () => {

        // Test if feeds array is defined
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test if feeds are having valid URLs
        it("have URLs", () => {
            for (const feed of allFeeds) {
                const { url } = feed;
                expect(url).toBeDefined();
                expect(url.length).toBeGreaterThan(1);
                expect(url).toMatch(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
            }
        });

        // Test if feeds are having valid names
        it("have names", () => {
            for (const feed of allFeeds) {
                const { name } = feed;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            }
        });
    });

    // Tests for hamburger menu
    describe('The menu', () => {
        const body = document.querySelector('body');
        const menuIcon = document.querySelector('.menu-icon-link');

        // Testing if menu is hidden initially
        it('element is hidden by default', () => {
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });

        // Testing if menu is shown/hidden on icon click
        it('element changes visibility on icon click', () => {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBeFalsy();

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    // Tests for initial RSS Feed entries
    describe('Initial Entries', () => {
        const feed = document.querySelector('.feed');

        beforeEach(done => {
            loadFeed(0, () => {
                done();
            });
        });

        // Testing if at least one entry is being loaded to the feed
        it('at least 1 entry is loaded to the feed', done => {
            const entry = document.querySelector('article.entry');
            expect(feed.children.item(0).contains(entry)).toBeTruthy();
            done();
        });
    });

    // Tests for feed selection
    describe('New Feed Selection', () => {
        let initialFeed, newFeed;

        beforeEach(done => {
            loadFeed(0, () => {
                initialFeed = document.querySelector('.feed').firstElementChild;

                loadFeed(1, () => {
                    done();
                });
            });
        });

        // Testing if RSS Feed is updated when new feed is loaded
        it('is updated when new feed is loaded', done => {
            newFeed = document.querySelector('.feed').firstElementChild;
            expect(initialFeed.innerHTML).not.toBe(newFeed.innerHTML);
            done();
        });
    });
}());
