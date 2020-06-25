const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// https://api.github.com/users/
process.stdout.write('\033c');
rl.question("[?] - What is the github name?: ", function(github_name) {
    let url = `https://api.github.com/users/${github_name}`;
    let settings = { method: "get"};

    (async () => {
        const response = await fetch(url, settings);
        const json = await response.json();

        let user = {
            login: json['login'],
            username: json['name'],
            id: json['id'],
            account_type: json['type'],
        };

        let account = {
            repos: json['public_repos'],
            gists: json['public_gists'],
            followers: json['followers'],
            following: json['following'],
        };
        
        let info = {
            location: json['location'],
            company: json['company'],
            email: json['email'],
            created: json['created_at'],
        };

        process.stdout.write('\033c');

        console.log(user, '\n');
        console.log(account, '\n');
        console.log(info);

        rl.close();
    })();
});