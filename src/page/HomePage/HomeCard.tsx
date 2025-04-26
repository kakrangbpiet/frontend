import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectTravelPackagesByCategory } from '../../redux/slices/Travel/TravelSlice';
import { fetchTravelPackagesApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';

const DashboardCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
`;

const TravelPackagesList = ({ category }: { category: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Get travel items for the specific category
  const travelPackages = useSelector(selectTravelPackagesByCategory(category));

  useEffect(() => {
    // Fetch items when component mounts or category changes
    dispatch(fetchTravelPackagesApi({ 
      category, 
      status:"active",
      pageSize: 10,
      page: 1
    }));
  }, [dispatch, category]);

  return (
    <DashboardCard>
      <h2>{category} Packages</h2>
      {travelPackages.length === 0 ? (
        <p>No {category} packages available</p>
      ) : (
        <ul>
          {travelPackages.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {/* <p>Price: ${item.price}</p> */}
              {/* Add more item details as needed */}
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
};

export default TravelPackagesList;