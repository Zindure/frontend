# FrontEnd Web Applications

## 👷 Steps

1. Install dependencies : `npm install`
2. Run node in ssl `$env:NODE_OPTIONS = "--openssl-legacy-provider"`
3. Run the backend `npm start`
4. open chrome without cors `"[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp` and go to http://localhost:8080/

User stories : 

✅ USR1 : As a random visitor, I want to be able to register an account or log-in, so I can
access all features 

✅ USR2 : As a random visitor, I want to be redirected to the login/register page when I click on
“location" tab, so that I know I must log-in to see its content 

✅ USR3 : As a logged-in user, I want to see locations and be able to click on one location to
open a modal containing details, so that the website is useful

❌ USR4 : : As an “admin" user, I want to see a “Add Location” button in the location page, so
that I can create a new location

❌ USR5 : As an “admin" user, I want to see a button to edit locations in the array of locations,
so that I can edit existing locations

✅ USR6 : As an “admin" user, I want to see a button to delete locations in the array of
locations so that I can delete existing locations

I had trouble understanding the CORS errors I was getting, and from what I understand, it was caused by having front and backend, on the same machine, which should only be an issue in development. I therefore didn't think it problematic to deacctivate cors when using chrome.