export function getNextBudgetNumber() {
    const last = localStorage.getItem("lastBudgetNumber")
    const next = last ? parseInt(last) + 1 : 1
  
    localStorage.setItem("lastBudgetNumber", next)
  
    return next.toString().padStart(4, "0")
  }
  