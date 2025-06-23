"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock, MapPin, Calendar, DollarSign, User, Activity } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FraudResult {
  id: number
  trans_date_trans_time: string
  amount_inr: number
  sender_city: string
  receiver_city: string
  category: string
  date_of_birth: string
  has_previous_transaction: boolean
  previous_transaction_date?: string
  distance_km: number
  city_pop: number
  age: number
  hour: number
  weekday: number
  day: number
  month: number
  is_night: boolean
  secs_since_last: number
  risk_score: number
  status: "low" | "medium" | "high"
  recommendation: "approve" | "review" | "block"
  confidence_score: number
  fraud_probability: number
  model_version: string
  processing_time: number
  risk_level_color: string
  factors: string[]
  timestamp: string
  created_at: string
}

interface FormData {
  amount_inr: string
  sender_city: string
  receiver_city: string
  category: string
  date_of_birth: string
  has_previous_transaction: boolean
  previous_transaction_date: string
}

// Hardcoded cities and categories as fallback
const FALLBACK_CITIES = [
  "Columbia",
  "Altonah",
  "Bellmore",
  "Titusville",
  "Falmouth",
  "Breesport",
  "Carlotta",
  "Spencer",
  "Morrisdale",
  "Prairie Hill",
  "Westport",
  "Fort Washakie",
  "Loxahatchee",
  "Rock Tavern",
  "Jones",
  "Deltona",
  "Key West",
  "Grandview",
  "Saint Amant",
  "Clarks Mills",
  "Alpharetta",
  "Colorado Springs",
  "Greenville",
  "Tomahawk",
  "Goodrich",
  "Daly City",
  "South Londonderry",
  "Lepanto",
  "New Waverly",
  "New York City",
  "Pewee Valley",
  "Plainfield",
  "Belmond",
  "Bagley",
  "Manchester",
  "Sontag",
  "Hawthorne",
  "Gadsden",
  "Birmingham",
  "Ollie",
  "Baton Rouge",
  "San Antonio",
  "Southfield",
  "Mc Cracken",
  "Purmela",
  "Lomax",
  "Tuscarora",
  "Sunflower",
  "Ogdensburg",
  "Redford",
  "Brooklin",
  "Fields Landing",
  "Rocky Mount",
  "Port Saint Lucie",
  "Graniteville",
  "Tiptonville",
  "Washington",
  "Clearwater",
  "Brooklyn",
  "Superior",
  "Glendale",
  "Hudson",
  "Rock Springs",
  "Hurley",
  "Fort Myers",
  "Turner",
  "Smiths Grove",
  "Elizabeth",
  "Bauxite",
  "Sachse",
  "Emmons",
  "New Holstein",
  "Saint Petersburg",
  "Cokeburg",
  "Roosevelt",
  "Centerview",
  "Conway",
  "Tallmansville",
  "Ruidoso",
  "Oriskany Falls",
  "Elk Rapids",
  "Monmouth Beach",
  "North Brookfield",
  "Mount Saint Joseph",
  "Sprague",
  "Cass",
  "Cord",
  "Shenandoah Junction",
  "New Ellenton",
  "Munith",
  "De Witt",
  "Cuyahoga Falls",
  "Drakes Branch",
  "Romulus",
  "Tyaskin",
  "Philadelphia",
  "North Loup",
  "Hartford",
  "Moriarty",
  "Eureka",
  "Wheaton",
  "Amanda",
  "Altair",
  "Ratcliff",
  "Murfreesboro",
  "Plantersville",
  "Pembroke Township",
  "Lahoma",
  "Phoenix",
  "Leonard",
  "Kittery Point",
  "East Andover",
  "Meridian",
  "Bowdoin",
  "Dallas",
  "Espanola",
  "Sherman",
  "Aledo",
  "Weeping Water",
  "Norwalk",
  "Creola",
  "Arcadia",
  "Eugene",
  "Fulton",
  "Helm",
  "Sutherland",
  "Egan",
  "Lakeland",
  "Thomas",
  "Holstein",
  "Battle Creek",
  "Deane",
  "Ragland",
  "Norman Park",
  "North Washington",
  "Lake Jackson",
  "Corriganville",
  "Milford",
  "Hannawa Falls",
  "Union",
  "Sterling City",
  "Smock",
  "Muskegon",
  "Dayton",
  "Sun City",
  "Andrews",
  "Spirit Lake",
  "Ruckersville",
  "Wilmington",
  "Henderson",
  "Rossville",
  "Altona",
  "Linthicum Heights",
  "Heidelberg",
  "Tickfaw",
  "Shippingport",
  "Mendon",
  "Ashfield",
  "Littleton",
  "Matawan",
  "Premier",
  "Greenwich",
  "Center Tuftonboro",
  "Summerfield",
  "Cedar",
  "University",
  "Winger",
  "De Lancey",
  "Cottekill",
  "Mooresville",
  "Blairstown",
  "Oxford",
  "Fordoche",
  "Issaquah",
  "Johns Island",
  "Laguna Hills",
  "Lithopolis",
  "Spring Church",
  "South Hero",
  "Unionville",
  "Moulton",
  "Arnold",
  "New Goshen",
  "Port Costa",
  "Norman",
  "Wittenberg",
  "Mayersville",
  "Tekoa",
  "Kingsport",
  "Bessemer",
  "Manistique",
  "Falconer",
  "Hinckley",
  "Port Ewen",
  "Hopkins",
  "Hooper",
  "Cecilton",
  "Kansas City",
  "Burrton",
  "Haines City",
  "Surrency",
  "Grover",
  "Warren",
  "West Harrison",
  "Woodville",
  "Center Point",
  "Thida",
  "Humble",
  "Hovland",
  "Oklahoma City",
  "Zavalla",
  "Cazenovia",
  "Annapolis",
  "Hancock",
  "Scotia",
  "Heart Butte",
  "Marathon",
  "Corona",
  "Houston",
  "Halstad",
  "Topeka",
  "Grand Bay",
  "Montrose",
  "Esbon",
  "Leo",
  "Stanchfield",
  "Mobile",
  "Burlington",
  "Lohrville",
  "Achille",
  "Dadeville",
  "Dublin",
  "Etlan",
  "Ridgeland",
  "Leetsdale",
  "Methuen",
  "Ford",
  "Jordanville",
  "Cleveland",
  "Payson",
  "Elizabethtown",
  "Lorenzo",
  "Edmond",
  "Santa Monica",
  "Kirk",
  "Belgrade",
  "Bryant",
  "Delhi",
  "Logan",
  "Orient",
  "San Jose",
  "Kingsford Heights",
  "Alton",
  "Baroda",
  "Basye",
  "Oakland",
  "Marienville",
  "Fairview",
  "Tupper Lake",
  "West Sayville",
  "Uledi",
  "Brandon",
  "Alexandria",
  "Lagrange",
  "Westhampton Beach",
  "Gretna",
  "Sheffield",
  "Mifflin",
  "Jermyn",
  "Lonsdale",
  "Rochester",
  "Ranier",
  "Lowville",
  "Newark Valley",
  "Grant",
  "Boulder",
  "Clarksville",
  "Great Mills",
  "Tulsa",
  "Sacramento",
  "Moorhead",
  "Wilton",
  "Olmsted",
  "Christine",
  "Cochranton",
  "Nokomis",
  "May",
  "Naples",
  "Riverton",
  "Jackson",
  "Keller",
  "Ronceverte",
  "Nazareth",
  "Jelm",
  "Valentine",
  "Clay Center",
  "Lebanon",
  "Moundsville",
  "Wendel",
  "Kensington",
  "Kilgore",
  "Utica",
  "Sebring",
  "Winthrop",
  "Port Richey",
  "Clarinda",
  "Hedley",
  "West Bethel",
  "Cascade Locks",
  "Churubusco",
  "Diamond",
  "Knoxville",
  "Schaefferstown",
  "Waupaca",
  "Eldridge",
  "Edisto Island",
  "Higganum",
  "Girard",
  "Lawn",
  "Collettsville",
  "Gibsonville",
  "Tyler",
  "Saxon",
  "Afton",
  "Pearlington",
  "Yellowstone National Park",
  "Ballwin",
  "Mount Perry",
  "West Green",
  "Bay City",
  "Wetmore",
  "Lima",
  "Melbourne",
  "Roma",
  "Greenwood",
  "Kirtland Afb",
  "Brownville",
  "Mesa",
  "Newhall",
  "Kirby",
  "Bridger",
  "Brunson",
  "Grassflat",
  "Dieterich",
  "Loving",
  "Canton",
  "Albany",
  "West Decatur",
  "Reno",
  "Schaumburg",
  "Grenada",
  "Mill Creek",
  "Cranks",
  "Farmington",
  "Detroit",
  "Iselin",
  "Shields",
  "Manville",
  "Allentown",
  "Meadville",
  "Whigham",
  "Dunlevy",
  "Cisco",
  "Hatch",
  "Oconto Falls",
  "Coffeeville",
  "Paint Rock",
  "Red River",
  "Port Charlotte",
  "Brantley",
  "Belfast",
  "East Canaan",
  "Parks",
  "Bronx",
  "Bethel Springs",
  "Holcomb",
  "Port Gibson",
  "Sauk Rapids",
  "Williamsburg",
  "Sula",
  "Steuben",
  "Randolph",
  "Vanderbilt",
  "Dongola",
  "Rule",
  "Highland",
  "Big Creek",
  "Hinesburg",
  "Halma",
  "Juliette",
  "Doe Hill",
  "New Boston",
  "Belmont",
  "Murrayville",
  "Bolivar",
  "Lowell",
  "West Palm Beach",
  "Coyle",
  "West Hartford",
  "Mount Hope",
  "Smith River",
  "Stephensport",
  "Pomona",
  "Cape Coral",
  "Moab",
  "Luzerne",
  "Nobleboro",
  "Aurora",
  "Grand Ridge",
  "San Diego",
  "Wauchula",
  "West Columbia",
  "Heiskell",
  "Putnam",
  "Dexter",
  "White Sulphur Springs",
  "Fiddletown",
  "Hedrick",
  "Holliday",
  "Bolton",
  "North Haverhill",
  "Greendale",
  "Indianapolis",
  "Cadiz",
  "Lonetree",
  "Los Angeles",
  "Joliet",
  "Kissee Mills",
  "Garrattsville",
  "Auburn",
  "Armonk",
  "Spearsville",
  "Gaithersburg",
  "Shelter Island",
  "Galatia",
  "Lakeview",
  "Burke",
  "Iliff",
  "Haw River",
  "Hurricane",
  "Hills",
  "Ozawkie",
  "Prosperity",
  "West Monroe",
  "Ruth",
  "Viola",
  "Old Hickory",
  "Atlantic",
  "Mountain Park",
  "West Long Branch",
  "Armagh",
  "Lamberton",
  "Tryon",
  "Cross",
  "Downsville",
  "Indian Wells",
  "El Paso",
  "Harrodsburg",
  "Cassatt",
  "Grand Junction",
  "Odessa",
  "Newberg",
  "Ringwood",
  "Carlisle",
  "Ironton",
  "Red Cliff",
  "East Troy",
  "Keisterville",
  "Coleman",
  "Mansfield",
  "Thrall",
  "Umatilla",
  "Whaleyville",
  "Harper",
  "Manley",
  "Creedmoor",
  "Avoca",
  "Moravian Falls",
  "Paauilo",
  "Georgetown",
  "Walnut Ridge",
  "Texarkana",
  "Orr",
  "Corsica",
  "Michigan",
  "Beaver Falls",
  "Minneapolis",
  "Thompson",
  "Ash Flat",
  "Grimesland",
  "North Wilkesboro",
  "Waynesfield",
  "Acworth",
  "Damascus",
  "Karnack",
  "Elkhart",
  "Cardwell",
  "Westerville",
  "Mound City",
  "Coleharbor",
  "Louisville",
  "Freedom",
  "Pikesville",
  "Wilmette",
  "Camden",
  "Lanark Village",
  "Darien",
  "Cromona",
  "West Eaton",
  "Independence",
  "River",
  "Elberta",
  "Athena",
  "Cuthbert",
  "Pointe Aux Pins",
  "Pittsburgh",
  "Arlington",
  "Bristow",
  "Lakeport",
  "Deadwood",
  "Smackover",
  "Carroll",
  "Winfield",
  "Bonita Springs",
  "Duncan",
  "Sturgis",
  "Tampa",
  "Slayden",
  "Tomales",
  "Wichita",
  "Saint Bonaventure",
  "Bowersville",
  "Ferney",
  "O Brien",
  "Florence",
  "Barnard",
  "Greenview",
  "Saint James City",
  "Enola",
  "Brashear",
  "Irwinton",
  "Fenelton",
  "June Lake",
  "Des Moines",
  "Mc Veytown",
  "Avera",
  "Bradley",
  "Glade Spring",
  "Stirling",
  "Haynes",
  "West Finley",
  "Bay Minette",
  "Pelham",
  "Scotland",
  "Ehrhardt",
  "Saint Paul",
  "Jefferson",
  "Hazel",
  "Watertown",
  "Laramie",
  "Plymouth",
  "Seneca",
  "Oolitic",
  "Clifton",
  "Mallie",
  "Holloway",
  "Richland",
  "Clayton",
  "Roseland",
  "Tamaroa",
  "Campbell",
  "Emporium",
  "Burbank",
  "De Soto",
  "Parsonsfield",
  "Chester Heights",
  "Springfield",
  "Oak Hill",
  "Paradise Valley",
  "Cross Plains",
  "Noonan",
  "Napa",
  "Goreville",
  "East Rochester",
  "Zaleski",
  "Powell",
  "Barneveld",
  "Moores Hill",
  "Boonton",
  "Harmony",
  "Monetta",
  "Falls Church",
  "Sixes",
  "North Tonawanda",
  "Harrington Park",
  "Tower Hill",
  "Laredo",
  "Catawba",
  "Brinson",
  "Huntsville",
  "Eagarville",
  "Gardiner",
  "Montgomery",
  "Lawrence",
  "Irvine",
  "Early",
  "Pueblo",
  "Reynolds",
  "Lake Oswego",
  "Rhame",
  "Vancouver",
  "Pecos",
  "Mounds",
  "Blackville",
  "Scarborough",
  "Big Indian",
  "Dumont",
  "Montandon",
  "Saint Francis",
  "New Memphis",
  "Howes Cave",
  "Lane",
  "North Judson",
  "Atglen",
  "Mc Nabb",
  "Williams",
  "Queenstown",
  "Blooming Grove",
  "Maysville",
  "Fullerton",
  "Cherokee Village",
  "Fayetteville",
  "Webster City",
  "Notrees",
  "Colton",
  "Browning",
  "Republic",
  "Winslow",
  "Stillwater",
  "Providence",
  "Shedd",
  "Malad City",
  "Bridgeport",
  "Benton",
  "Clune",
  "Denham Springs",
  "Glen Rock",
  "Akron",
  "Trenton",
  "Manquin",
  "North Augusta",
  "Beasley",
  "Falls City",
  "Stittville",
  "Whittemore",
  "Bristol",
  "Oaks",
  "Mountain Center",
  "Vero Beach",
  "Mulberry Grove",
  "Central",
  "Humboldt",
  "Marietta",
  "Powell Butte",
  "Hewitt",
  "Valdosta",
  "Oakdale",
  "Albuquerque",
  "Liberty Mills",
  "Riverview",
  "Howells",
  "Kent",
  "West Henrietta",
  "Bailey",
  "Springfield Gardens",
  "Edinburg",
  "Barnstable",
  "Shrewsbury",
  "Saint Louis",
  "Meredith",
  "Burns Flat",
  "Comfort",
  "Dalton",
  "Margaretville",
  "Comfrey",
  "Maria Stein",
  "Palermo",
  "American Fork",
  "Brainard",
  "Grantham",
  "De Queen",
  "Ashford",
  "Vienna",
  "Westfir",
  "Paulding",
  "Milwaukee",
  "Wales",
  "Blairsden-Graeagle",
  "Hopewell",
  "Jaffrey",
  "Cowlesville",
  "Omaha",
  "Luray",
  "North Prairie",
  "Washington Court House",
  "Belle Fourche",
  "High Rolls Mountain Park",
  "Hahira",
  "Rockwell",
  "Rockwood",
  "Oakford",
  "Norwich",
  "Washoe Valley",
  "Daniels",
  "Bynum",
  "Sea Island",
  "Bethel",
  "Portland",
  "Stayton",
  "Chester",
  "Collegeville",
  "Miamisburg",
  "Mount Morris",
  "Nelson",
  "Beaverdam",
  "Hawley",
  "Kings Bay",
  "Minnesota Lake",
  "Fairhope",
  "South Richmond Hill",
  "Boyd",
  "Allenhurst",
  "Marion",
  "Phenix City",
  "Alder",
  "Lolita",
  "Orangeburg",
  "Timberville",
  "North Las Vegas",
  "Harborcreek",
  "Alva",
  "Kenner",
  "Milner",
  "Lubbock",
  "Owensville",
  "Varnell",
  "Prairie Creek",
  "Winter",
  "Broomfield",
  "Vinton",
  "Sardis",
  "Bonfield",
  "Harwood",
  "Quanah",
  "Gregory",
  "Crownpoint",
  "Honokaa",
  "Garfield",
  "Parker",
  "San Angelo",
  "Amsterdam",
  "Livonia",
  "Louisiana",
  "Cressona",
  "Hampton",
  "Phil Campbell",
  "Rumely",
  "Manderson",
  "Moro",
  "Mount Clemens",
  "Palmyra",
  "Easton",
  "Pembroke",
  "Paxton",
  "Newport",
  "Huslia",
  "Waukesha",
  "Curlew",
  "Matthews",
  "Paris",
  "Gainesville",
  "Lamy",
  "Moriches",
  "Mc Clellandtown",
  "Thornville",
  "Llano",
  "Azusa",
  "Princeton",
  "Heislerville",
  "Parker Dam",
  "Arvada",
  "Northport",
  "Rosewood",
  "Scotts Mills",
  "Spring",
  "Newton",
  "Jay",
  "Skytop",
  "Kingsville",
  "Mc Intosh",
  "Knowlesville",
  "Bigelow",
  "Adams",
  "Loami",
  "Greenbush",
  "Chatham",
  "Du Pont",
  "Woods Cross",
  "Rock Glen",
  "New Franken",
  "Veedersburg",
  "Huntington Beach",
  "Parkers Lake",
  "Smithfield",
  "Dell City",
  "Desdemona",
  "Amorita",
  "Remer",
  "Dubre",
  "Metairie",
  "Manor",
  "Clutier",
  "Dresden",
  "Monitor",
  "Jordan Valley",
  "Apison",
  "Ravenna",
  "Palmdale",
  "Moscow",
  "West Chazy",
  "Oran",
  "Springville",
  "Stoneham",
  "Claremont",
  "Pea Ridge",
  "Preston",
  "Syracuse",
  "Rice",
  "Grifton",
  "Lexington",
  "Kirkwood",
  "Kirtland",
  "Morrowville",
  "Seligman",
  "Seattle",
  "Wever",
  "Guthrie",
  "Craig",
  "Senatobia",
]

const FALLBACK_CATEGORIES = [
  "personal_care",
  "health_fitness",
  "misc_pos",
  "travel",
  "kids_pets",
  "shopping_pos",
  "food_dining",
  "home",
  "entertainment",
  "shopping_net",
  "misc_net",
  "grocery_pos",
  "gas_transport",
  "grocery_net",
]

export default function ManualCheckPage() {
  const [formData, setFormData] = useState<FormData>({
    amount_inr: "",
    sender_city: "",
    receiver_city: "",
    category: "",
    date_of_birth: "",
    has_previous_transaction: false,
    previous_transaction_date: "",
  })

  const [cities, setCities] = useState<string[]>(FALLBACK_CITIES)
  const [categories, setCategories] = useState<string[]>(FALLBACK_CATEGORIES)
  const [result, setResult] = useState<FraudResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error">("loading")

  // Load cities and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading cities and categories...")

        // Try multiple possible API endpoints
        const possibleEndpoints = [
          "http://localhost:8000/api/cities/",
          "/api/cities/",
          "http://127.0.0.1:8000/api/cities/",
        ]

        let citiesData = null
        let categoriesData = null

        for (const baseUrl of possibleEndpoints) {
          try {
            const [citiesRes, categoriesRes] = await Promise.all([
              fetch(baseUrl.replace("/cities/", "/cities/")),
              fetch(baseUrl.replace("/cities/", "/categories/")),
            ])

            if (citiesRes.ok && categoriesRes.ok) {
              citiesData = await citiesRes.json()
              categoriesData = await categoriesRes.json()
              console.log("API data loaded successfully:", { citiesData, categoriesData })
              break
            }
          } catch (err) {
            console.log(`Failed to fetch from ${baseUrl}:`, err)
            continue
          }
        }

        if (citiesData && categoriesData) {
          setCities(citiesData.cities || FALLBACK_CITIES)
          setCategories(categoriesData.categories || FALLBACK_CATEGORIES)
          setApiStatus("success")
        } else {
          console.log("Using fallback data")
          setCities(FALLBACK_CITIES)
          setCategories(FALLBACK_CATEGORIES)
          setApiStatus("error")
        }
      } catch (err) {
        console.error("Error loading data:", err)
        setCities(FALLBACK_CITIES)
        setCategories(FALLBACK_CATEGORIES)
        setApiStatus("error")
      }
    }

    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      console.log("Submitting form data:", formData)

      // Try multiple possible API endpoints for fraud check
      const possibleEndpoints = [
        "http://localhost:8000/api/check-fraud/",
        "/api/check-fraud/",
        "http://127.0.0.1:8000/api/check-fraud/",
      ]

      let response = null

      for (const endpoint of possibleEndpoints) {
        try {
          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "fdaas_demo_key_123",
            },
            body: JSON.stringify({
              ...formData,
              amount_inr: Number.parseFloat(formData.amount_inr),
              previous_transaction_date:
                formData.has_previous_transaction && formData.previous_transaction_date
                  ? formData.previous_transaction_date
                  : null,
            }),
          })

          if (response.ok) {
            break
          }
        } catch (err) {
          console.log(`Failed to submit to ${endpoint}:`, err)
          continue
        }
      }

      if (!response || !response.ok) {
        const errorData = await response?.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to check fraud - API server may be down")
      }

      const data = await response.json()
      console.log("Fraud check result:", data)
      setResult(data)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getRiskBadgeColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "approve":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "review":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "block":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">XGBoost Fraud Detection</h1>
          <p className="text-lg text-gray-600">Advanced ML-powered transaction fraud analysis</p>
          {apiStatus === "error" && (
            <div className="mt-2 text-sm text-orange-600">⚠️ Using offline data - API server may be down</div>
          )}
          {apiStatus === "success" && <div className="mt-2 text-sm text-green-600">✅ Connected to API server</div>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Transaction Details
              </CardTitle>
              <CardDescription>
                Enter transaction information for fraud analysis using our XGBoost model
                <br />
                <span className="text-xs text-gray-500">
                  Cities loaded: {cities.length} | Categories loaded: {categories.length}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount_inr" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Amount (INR)
                  </Label>
                  <Input
                    id="amount_inr"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter amount in INR"
                    value={formData.amount_inr}
                    onChange={(e) => setFormData((prev) => ({ ...prev, amount_inr: e.target.value }))}
                    required
                  />
                </div>

                {/* Cities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Sender City ({cities.length} cities)
                    </Label>
                    <Select
                      value={formData.sender_city}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, sender_city: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sender city" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Receiver City ({cities.length} cities)
                    </Label>
                    <Select
                      value={formData.receiver_city}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, receiver_city: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select receiver city" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Transaction Category ({categories.length} categories)</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Date of Birth
                  </Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date_of_birth: e.target.value }))}
                    required
                  />
                </div>

                {/* Previous Transaction */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="has_previous_transaction"
                      checked={formData.has_previous_transaction}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          has_previous_transaction: e.target.checked,
                          previous_transaction_date: e.target.checked ? prev.previous_transaction_date : "",
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="has_previous_transaction">Has made previous transaction with this person?</Label>
                  </div>

                  {formData.has_previous_transaction && (
                    <div className="space-y-2">
                      <Label htmlFor="previous_transaction_date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Previous Transaction Date & Time
                      </Label>
                      <Input
                        id="previous_transaction_date"
                        type="datetime-local"
                        value={formData.previous_transaction_date}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, previous_transaction_date: e.target.value }))
                        }
                        required={formData.has_previous_transaction}
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Check for Fraud"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <>
                {/* Main Result */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Fraud Analysis Result</span>
                      <Badge className={getRiskBadgeColor(result.status)}>{result.status.toUpperCase()} RISK</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{result.risk_score}/10</div>
                        <div className="text-sm text-gray-600">Risk Score</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{result.confidence_score}%</div>
                        <div className="text-sm text-gray-600">Confidence</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getRecommendationIcon(result.recommendation)}
                        <span className="font-medium">Recommendation:</span>
                      </div>
                      <span className="font-bold text-blue-900 uppercase">{result.recommendation}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <div>Model: {result.model_version}</div>
                      <div>Processing Time: {result.processing_time}ms</div>
                      <div>Fraud Probability: {(result.fraud_probability * 100).toFixed(2)}%</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction Features */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Transaction Features</CardTitle>
                    <CardDescription>Calculated features used by the XGBoost model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Distance:</span> {result.distance_km.toFixed(1)} km
                      </div>
                      <div>
                        <span className="font-medium">City Population:</span> {result.city_pop.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">User Age:</span> {result.age} years
                      </div>
                      <div>
                        <span className="font-medium">Transaction Hour:</span> {result.hour}:00
                      </div>
                      <div>
                        <span className="font-medium">Day of Week:</span>{" "}
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][result.weekday]}
                      </div>
                      <div>
                        <span className="font-medium">Night Transaction:</span> {result.is_night ? "Yes" : "No"}
                      </div>
                      <div>
                        <span className="font-medium">Time Since Last:</span>{" "}
                        {result.secs_since_last > 0
                          ? `${Math.round(result.secs_since_last / 3600)}h`
                          : "First transaction"}
                      </div>
                      <div>
                        <span className="font-medium">Route:</span> {result.sender_city} → {result.receiver_city}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                {result.factors && result.factors.length > 0 && (
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Risk Factors Detected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.factors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
