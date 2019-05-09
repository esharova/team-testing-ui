describe('Интеграционные тесты ui', () => {
    it('Эмулируем баг с продакшена 666', async (done) => {
        await page.goto('http://localhost:3000');
        await page.setRequestInterception(true);
        let offersRequestCounter = 0;
        page.on('request', interceptedRequest => {
            if (interceptedRequest.url().endsWith('/offers')) {
                offersRequestCounter++;
                setTimeout(() => {
                    interceptedRequest.continue();
                }, 2000);
            } else
                interceptedRequest.continue();
        });

        const button = await page.waitForXPath('//*[text()="Хочу ипотеку"]');
        await button.click();

        setTimeout(() => {
            expect(offersRequestCounter).toEqual(2);
            done();
        }, 3000);
    });
});
