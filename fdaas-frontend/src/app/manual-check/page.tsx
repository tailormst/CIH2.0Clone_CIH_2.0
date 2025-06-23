"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, AlertTriangle, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react"
import Navbar from "@/components/Navbar"

// Your exact categories and cities from the ML model
const CATEGORIES = [
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

const CITIES = [
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

interface FraudResult {
  success: boolean
  risk_score: number
  status: "low" | "medium" | "high"
  recommendation: "approve" | "review" | "block"
  fraud_probability: number
  confidence_score: number
  processing_time: number
  model_version: string
  features: any
  risk_factors: string[]
  timestamp: string
  is_manual_check: boolean
}

export default function ManualCheckPage() {
  const [formData, setFormData] = useState({
    category: "",
    amt_inr: "",
    sender_city: "",
    receiver_city: "",
    date_of_birth: "",
    has_previous_transaction: false,
    previous_transaction_date: "",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FraudResult | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

      const response = await fetch(`${API_URL}/api/fraud/predict/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          manual_check: true,
          amt_inr: Number.parseFloat(formData.amt_inr),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || "Prediction failed")
      }
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (status: string) => {
    switch (status) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getRiskIcon = (status: string) => {
    switch (status) {
      case "low":
        return <CheckCircle className="h-5 w-5" />
      case "medium":
        return <AlertTriangle className="h-5 w-5" />
      case "high":
        return <Shield className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual Fraud Check</h1>
            <p className="text-gray-600">Enter transaction details to check for fraud risk</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Transaction Details
                </CardTitle>
                <CardDescription>Fill in the transaction information for fraud analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Transaction Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.replace("_", " ").toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="amt_inr">Amount (INR)</Label>
                      <Input
                        id="amt_inr"
                        type="number"
                        step="0.01"
                        placeholder="Enter amount in INR"
                        value={formData.amt_inr}
                        onChange={(e) => setFormData({ ...formData, amt_inr: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sender_city">Sender City</Label>
                      <Select
                        value={formData.sender_city}
                        onValueChange={(value) => setFormData({ ...formData, sender_city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sender city" />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="receiver_city">Receiver City</Label>
                      <Select
                        value={formData.receiver_city}
                        onValueChange={(value) => setFormData({ ...formData, receiver_city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select receiver city" />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="has_previous_transaction"
                        checked={formData.has_previous_transaction}
                        onChange={(e) => setFormData({ ...formData, has_previous_transaction: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="has_previous_transaction">
                        Have you made a transaction with this person before?
                      </Label>
                    </div>

                    {formData.has_previous_transaction && (
                      <div>
                        <Label htmlFor="previous_transaction_date">Previous Transaction Date</Label>
                        <Input
                          id="previous_transaction_date"
                          type="date"
                          value={formData.previous_transaction_date}
                          onChange={(e) => setFormData({ ...formData, previous_transaction_date: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Check for Fraud
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          {getRiskIcon(result.status)}
                          Fraud Analysis Result
                        </span>
                        <Badge className={getRiskColor(result.status)}>{result.status.toUpperCase()} RISK</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">{result.risk_score}/10</div>
                          <div className="text-sm text-gray-600">Risk Score</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">
                            {(result.fraud_probability * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">Fraud Probability</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Recommendation:</span>
                          <span className="font-medium capitalize">{result.recommendation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confidence:</span>
                          <span className="font-medium">{result.confidence_score.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Time:</span>
                          <span className="font-medium">{result.processing_time.toFixed(2)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model Version:</span>
                          <span className="font-medium">{result.model_version}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {result.risk_factors && result.risk_factors.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Risk Factors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {result.risk_factors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor.replace("_", " ").toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {result.features && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Transaction Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {result.features.distance_km && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span>{result.features.distance_km.toFixed(1)} km</span>
                          </div>
                        )}
                        {result.features.city_pop && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg City Population:</span>
                            <span>{result.features.city_pop.toLocaleString()}</span>
                          </div>
                        )}
                        {result.features.age && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span>{result.features.age} years</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction Time:</span>
                          <span>
                            {result.features.hour}:00
                            {result.features.is_night ? " (Night)" : " (Day)"}
                          </span>
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
    </div>
  )
}
