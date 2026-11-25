const http = require('http');

const motoGP = [
    {
        circuit: 'Losail',
        location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    },
    {
        circuit: 'Autodromo',
        location: 'Argentine',
        winner: {
            firstName: 'Cal',
            lastName: 'Crutchlow',
            country: 'UK'
        }
    },
    {
        circuit: 'De Jerez',
        location: 'Spain',
        winner: {
            firstName: 'Valentino',
            lastName: 'Rossi',
            country: 'Italy'
        }
    },
    {
        circuit: 'Mugello',
        location: 'Italy',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    }
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/') {
        // 1. http://localhost:8000 -> Tampilkan seluruh data
        res.writeHead(200);
        res.end(JSON.stringify(motoGP, null, 2));

    } else if (req.url === '/country') {
        // 2. http://localhost:8000/country -> Pengelompokkan berdasarkan negara
        const groupedByCountry = motoGP.reduce((acc, item) => {
            const country = item.winner.country;
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push(item);
            return acc;
        }, {});

        res.writeHead(200);
        res.end(JSON.stringify(groupedByCountry, null, 2));

    } else if (req.url === '/name') {
        // 3. http://localhost:8000/name -> Pengelompokkan berdasarkan nama pemenang
        const groupedByName = motoGP.reduce((acc, item) => {
            const fullName = `${item.winner.firstName} ${item.winner.lastName}`;
            if (!acc[fullName]) {
                acc[fullName] = [];
            }
            acc[fullName].push(item);
            return acc;
        }, {});

        res.writeHead(200);
        res.end(JSON.stringify(groupedByName, null, 2));

    } else {
        // 4. Selain URL di atas -> Muncul "Bad Request"
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});