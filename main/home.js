// Home page: show a few books from the library (Firestore "books"), same cards as the Thư Viện page.
const FEATURED_COUNT = 5;

function formatPrice(saleInfo) {
    if (saleInfo.saleability === 'FREE') return 'Miễn Phí';
    if (saleInfo.saleability === 'FOR_SALE' && saleInfo.retailPrice) {
        const amount = saleInfo.retailPrice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${amount} ${saleInfo.retailPrice.currencyCode}`;
    }
    return 'Không có sẵn';
}

function featuredCard(book) {
    const info = book.volumeInfo;
    const card = document.createElement('div');
    card.className = 'book-card';

    const img = document.createElement('img');
    img.src = info.imageLinks.thumbnail.replace(/^http:\/\//, 'https://');
    img.alt = `Bìa sách ${info.title}`;
    img.loading = 'lazy';

    const title = document.createElement('h3');
    title.textContent = info.title;
    const author = document.createElement('p');
    author.className = 'author';
    author.textContent = info.authors ? info.authors[0] : 'Unknown';

    const footer = document.createElement('div');
    footer.className = 'footerBooks';
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = formatPrice(book.saleInfo);
    const read = document.createElement('button');
    read.className = 'buy-btn';
    read.textContent = 'Đọc Ngay';
    read.addEventListener('click', () => {
        localStorage.setItem('book', JSON.stringify(book));
        window.location.href = 'product.html';
    });
    footer.append(price, read);

    card.append(img, title, author, footer);
    return card;
}

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.querySelector('.book-grid');
    const section = document.getElementById('featured');
    try {
        const snapshot = await db.collection('books').limit(FEATURED_COUNT * 2).get();
        const books = snapshot.docs
            .map(doc => doc.data().data)
            .filter(book => book && book.volumeInfo && book.volumeInfo.imageLinks)
            .slice(0, FEATURED_COUNT);
        books.forEach(book => grid.appendChild(featuredCard(book)));
        section.hidden = books.length === 0;
    } catch (err) {
        console.error('Không tải được sách nổi bật:', err);
        section.hidden = true;
    }
});
