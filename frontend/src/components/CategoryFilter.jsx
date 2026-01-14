export default function CategoryFilter({ selected, onSelect }) {
    const categories = ["todos", "paneles", "inversores", "baterias"]
  
    return (
      <div style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              marginRight: 10,
              padding: "6px 12px",
              background: selected === cat ? "#222" : "#eee",
              color: selected === cat ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }
  