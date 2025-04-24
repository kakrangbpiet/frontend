import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { fetchAllCategories, fetchAllTitles, fetchTravelPackagesApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';
import { selectCategories, selectedTravelPackages, selectedTravelPackagesLoading, selectTitles } from '../../redux/slices/Travel/TravelSlice';
import TravelPackages from '../../components/Card/TravelPackageItems.tsx';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import locationsData from '../../components/Forms/Location.json';

const DashboardGrid = styled.div`
  width: 100%;
`;

const PackagesSection = styled.div`
  padding: 2rem;
  position: relative; 
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; 
  min-height: 60vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
  z-index: 4; 
  margin-bottom: 2rem; 
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroText = styled.div`
  max-width: 800px;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 300; 
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 90%;
    gap: 0.75rem;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchResultItem = styled.div`
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ResultType = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
  margin-right: 0.5rem;
`;


const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 640px) {
    width: 100%;
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
  }
`;


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { title } = useOutletContext<{ title: string }>();
  const categories = useSelector(selectCategories);

  const titles = useSelector(selectTitles);
  const travelPackages = useSelector(selectedTravelPackages);
  const travelPackagesLoading = useSelector(selectedTravelPackagesLoading);
  
  useEffect(() => {
    // Fetch all categories, and titles when component mounts
    dispatch(fetchAllCategories());
    dispatch(fetchAllTitles());
    
    if (auth && selectedUserType === UserCategory.KAKRAN_SUPER_ADMIN) {
      navigate("/dashboard");
    }
  }, [auth, navigate, selectedUserType, dispatch]);
  
  useEffect(() => {
    dispatch(fetchTravelPackagesApi({ status: "active" }))
  }, [dispatch]);

  // const handleLoadCategories = async () => {
  //   try {
  //     dispatch(
  //       fetchTravelPackagesApi({
  //         pageSize: 10,
  //         page: 1,
  //         category: "hotdeals",
  //         status: "active"
  //       })
  //     );
  //     dispatch(
  //       fetchTravelPackagesApi({
  //         pageSize: 10,
  //         page: 1,
  //         category: "pre-planned-trips",
  //         status: "active"
  //       })
  //     );
  //   } catch (error) {
  //     console.error("Failed to fetch travel packages:", error);
  //   }
  // };



  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results: any[] = [];
  
      // Match categories
      categories.forEach(category => {
        if (category.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'category',
            value: category,
            label: `Category: ${category}`
          });
        }
      });
  
      // Match locations
      locationsData.locations.forEach(location => {
        if (location.label.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'location',
            value: location,
            label: `Search in ${location.value}`
          });
        }
      });
      
  
      // Match titles
      titles.forEach(item => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'title',
            value: item,
            label: `Tour: ${item.title}`
          });
        }
      });
  
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    } else {
      setSearchResults([]);
    }
  };
  

  const handleResultClick = (result: any) => {
    setSearchQuery('');
    setSearchResults([]);
    
    if (result.type === 'category') {
      navigate(`/packages?category=${encodeURIComponent(result.value)}`);
    } else if (result.type === 'location') {
      navigate(`/packages?location=${encodeURIComponent(result.value.value)}`);
    } else if (result.type === 'title') {
      navigate(`/package/${result.value.id}/${result.value.title}`);
    }
  };
  

  const handleCustomizedTripClick = () => {
    navigate("/travel-form");
  };

  const handlePrePlannedTripsClick = () => {
    navigate("/pre-planned-trips");
  };



  return (
    <div>
      <ContentOverlay>
        <HeroText>
          <HeroTitle>{title || "Discover Amazing Destinations"}</HeroTitle>
        </HeroText>

        <ButtonContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for destinations, categories, or tours..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((result, index) => (
                  <SearchResultItem key={index} onClick={() => handleResultClick(result)}>
                    <ResultType>{result.type}</ResultType>
                    {result.label}
                  </SearchResultItem>
                ))}
              </SearchResults>
            )}
          </SearchContainer>

          <ButtonGroup>
            <Button onClick={handleCustomizedTripClick}>
              Plan Your Own Trip
            </Button>
            <Button onClick={handlePrePlannedTripsClick}>
              Pre-planned Trips
            </Button>
          </ButtonGroup>
        </ButtonContainer>
      </ContentOverlay>

      {/*test */}

      <div className=" bg-transparent flex items-center justify-center p-5">
        <div className="w-[450px] h-[80px] bg-transparent border border-white/30 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-lg">
            Explore With Us
          </h1>
        </div>
        
      </div>

      <TravelPackages
            travelPackages={travelPackages.travelPackages}
            categoryType="new"
            loading={travelPackagesLoading}
          />


      {/* <div className=" bg-transparent flex items-center justify-center p-5">
        <div className="w-[450px] h-[80px] bg-transparent border border-white/30 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-xl">

        </div>
      </div> */}
      {/*todo //UI*/}





      
      <DashboardGrid>
        <PackagesSection>

          <div className="text-center mt-12">
            <div className="inline-block px-8 py-3 text-white text-3xl font-extrabold tracking-wide bg-white/10 border border-white/20 rounded-xl backdrop-blur-md shadow-lg hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              Pre-Planned Trips
            </div>

            <div className="relative mt-4 flex justify-center">
              <span className="block w-24 h-[3px] bg-white/30 rounded-full transition-all duration-500 group-hover:w-32 group-hover:bg-white/60"></span>
            </div>
          </div>

          <TravelPackages
            travelPackages={travelPackages.travelPackages}
            categoryType="new"
            loading={travelPackagesLoading}
          />
        </PackagesSection>
      </DashboardGrid>
    </div>
  );
};

export default HomePage;