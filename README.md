![Boostarter](https://www.linkpicture.com/q/boostarter-logo.png)

# <b>Boostarter Client (ReactJS + Firebase)</b>
Click [here](https://boostarter.web.app/) to see live demo.

![Homepage](https://www.linkpicture.com/q/Screenshot-from-2021-06-28-13-31-51.png)

![CampaignDetailPage](https://www.linkpicture.com/q/Screenshot-from-2021-06-28-13-32-11.png)

![PersonalCampaignManagement](https://www.linkpicture.com/q/Screenshot-from-2021-06-28-13-31-27.png)

## <b>Quick start</b>

```
npm install
npm start
```

## <b>Reset client-side database</b>
- Step 1: Open browser -> press F12 -> select tab `Console`
- Step 2: Enter following lines to tab `Console`:
```js
localStorage.removeItem('__boostarterClient__authUser');
localStorage.removeItem('__boostarterClient__users');
localStorage.removeItem('__boostarterClient__campaigns');
localStorage.removeItem('__boostarterClient__notifications');
localStorage.removeItem('__boostarterClient__postedStatuses';
```

## <b>Available accounts</b>
### 1. Campaign Owner
+ email: owner@gmail.com
+ password: 123456

### 2. Donator
+ email: donator@gmail.com
+ password: 123456

### 3. Admin
+ email: admin@gmail.com
+ password: 123456