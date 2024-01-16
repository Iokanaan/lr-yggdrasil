export const globalSheets: Record<number, PjSheet> = {}
export const attributs: Attribut[] = ["agi", "vig", "pui", "int", "per", "ten", "cha", "ins", "com"]
export const difficultes: Difficulte[] = ["Très simple", "Simple", "Aisé", "Moyen", "Difficile", "Très Difficile", "Exceptionnel", "Légendaire", "Divin"]
export const competences = [
    "acrobatie", 
    "artisanat_1", 
    "artisanat_2", 
    "artisanat_3", 
    "arts_1", 
    "arts_2", 
    "arts_3",
    "attelage",
    "chercher",
    "chevaucher",
    "commerce",
    "discretion",
    "eloquence",
    "empathie",
    "escalade",
    "esquive",
    "herboristerie",
    "intimidation",
    "jeux",
    "langues_1",
    "langues_2",
    "langues_3",
    "larcins",
    "medecine",
    "mouvement",
    "navigation",
    "natation",
    "negociation",
    "sagas",
    "savoir_1",
    "savoir_2",
    "savoir_3",
    "seduction",
    "superstition",
    "survie",
    "tactique",
    "tradition",
    "vigilance",
    "galdr",
    "runes",
    "sejdr",
    "armes_courtes",
    "armes_longues",
    "armes_deux_mains",
    "armes_hast",
    "armes_tir",
    "lancer",
    "armes_improvisees",
    "additionnelle_1",
    "additionnelle_2",
    "additionnelle_3"
]
export const dynamicComps = ["artisanat", "arts", "langues", "savoir", "additionnelle"]

export const seuils = [
    {sr: 5, label: "Très Simple"},
    {sr: 7, label: "Simple"},
    {sr: 10, label: "Aisé"},
    {sr: 14, label: "Moyen"},
    {sr: 19, label: "Difficile"},
    {sr: 25, label: "Très Difficile"},
    {sr: 32, label: "Exceptionnel"},
    {sr: 40, label: "Légendaire"},
    {sr: 49, label: "Divin"},
]