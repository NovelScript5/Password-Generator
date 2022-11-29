const APIURL = `https://api.github.com/users/`

const Main = document.querySelector("main")
const Form = document.querySelector("form")
const Input = document.querySelector("input")

async function FetchProfile(UserName) {

    const Resp = await fetch(APIURL + UserName)
    const RespData = await Resp.json()
    console.log(RespData)
    AddCard(RespData)
    FetchRepos(UserName)

}

async function FetchRepos(UserName) {

    const Resp = await fetch(APIURL + UserName + "/repos")
    const RespData = await Resp.json()
    AddRepostoCard(RespData)

}

function AddCard(User) {

    const Card = `
    <div id="Card">

    <div>
        <img src="${User.avatar_url}" alt="">
    </div>

    <div>
        <h2>${User.name}</h2>
        <p>${User.bio}</p>
        <ul>
           <li><span>Followers: ${User.followers}</span></li>
           <li><span>Following: ${User.following}</span></li>
           <li><span>Public Repositories: ${User.public_repos} </span></li>
        </ul>
        <div class="repos"></div>
    </div>
</div>` 

Main.innerHTML = Card

}

function AddRepostoCard(repos) {

    const ReposEl = document.querySelector(".repos")

    repos.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0,10).forEach(repo => {

        const RepoEl = document.createElement("a")
        RepoEl.classList.add("repo")
        RepoEl.href = repo.html_url
        RepoEl.target = "_blank"
        RepoEl.innerText = repo.name
        ReposEl.appendChild(RepoEl)

    })



}

Form.addEventListener("submit", (e) => {

    const SearchInput = Input.value
    e.preventDefault()

    if (SearchInput) {

        FetchProfile(SearchInput)
        Input.value = ``
    }

})