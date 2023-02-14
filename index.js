let myLeads=[];
const saveBtn = document.getElementById("save-btn");
const delBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const input = document.getElementById("input");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


saveBtn.addEventListener("click", function(){
     myLeads.push(input.value);
     input.value="";
     localStorage.setItem("myLeads",JSON.stringify(myLeads));
     render(myLeads);
})

delBtn.addEventListener("dblclick",function(){
    myLeads=[];
    localStorage.clear();
    render(myLeads);

})
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads);
})

})

function render(leads){
    let listItems = ""
    for ( let i=0;i<leads.length;i++){
        listItems += `<li><a href="${leads[i]}" target="_blank"> ${leads[i]}</a> </li>`
    }
    ulEl.innerHTML=listItems
}



