const FraudCheckPage = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">Fraud Check</h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6">Enter the details below to check for potential fraud.</p>

      <form className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Check
        </button>
      </form>

      <div className="mt-8 p-4 sm:p-6 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p>No results yet. Please submit the form.</p>
      </div>
    </div>
  )
}

export default FraudCheckPage
