import Category from "../assets/Category.svg";
import House from "../assets/House.svg";
import Filter from "../assets/filter.png";

function CategoryPageBefore({CategoryName}) {
  return (
    <div className="relative bg-white overflow-hidden h-auto pt-8">
      {/* Background Houses */}
      <img
        className="absolute top-5 sm:top-10 right-0 w-[120px] sm:w-[237px] h-[200px] sm:h-[400px] opacity-80"
        src={House}
        alt="Decorative House"
      />
      <img
        className="absolute bottom-0 left-0 w-[140px] sm:w-[270px] h-[210px] sm:h-[610px] opacity-50"
        src={House}
        alt="Decorative House"
      />
      <img
        className="absolute bottom-0 right-10 w-[150px] sm:w-[250px] h-[200px] sm:h-[420px] opacity-70"
        src={House}
        alt="Decorative House"
      />
      <img
        className="absolute top-[25%] sm:top-[20%] right-[15%] w-[160px] sm:w-[277px] h-[180px] sm:h-[284px] opacity-70"
        src={House}
        alt="Decorative House"
      />
      <img
        className="absolute top-[30%] sm:top-[25%] left-[10%] w-[170px] sm:w-[250px] h-[200px] sm:h-[404px] opacity-50"
        src={House}
        alt="Decorative House"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 sm:py-32 space-y-6">
        <h1 className="text-2xl sm:text-5xl font-bold font-poppins text-black">
          Category Name
        </h1>
        <p className="text-lg sm:text-2xl font-light font-poppins text-gray-700">
          Sub-Heading
        </p>
        <img
          className="w-[100px] sm:w-[171px] h-[140px] sm:h-[340px] opacity-90 mt-4"
          src={Category}
          alt="Category Icon"
        />
      </div>

      {/* Footer Section */}
      <div className="relative z-50 -mt-20 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-16 py-8 space-y-4 sm:space-y-0">
        <p className="text-sm sm:text-lg font-poppins text-gray-600">
          Home \ Category
        </p>
        <div className="flex items-center w-full sm:w-[350px] bg-white border border-black shadow-md rounded-full px-4 py-2">
          <img src={Filter} alt="Filter Icon" className="h-5 sm:h-6 w-5 sm:w-6" />
          <input
            type="text"
            placeholder="Filter by price, location..."
            className="w-full bg-transparent focus:outline-none placeholder-gray-500 ml-2"
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPageBefore;
