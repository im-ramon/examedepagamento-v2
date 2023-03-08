import PocketBase from 'pocketbase';

// Install dot.env after to fix it
// Development:
// const pb = new PocketBase('http://127.0.0.1:8090');

// Production:
const pb = new PocketBase('https://pocketbase.examedepagamento.com.br/');

pb.beforeSend = function (url, options) {
    options.headers = Object.assign({}, options.headers, {
        'Access-Control-Allow-Origin': '*'
    });

    return { url, options };
};

export { pb };

