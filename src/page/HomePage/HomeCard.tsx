import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectTravelItemsByCategory } from '../../redux/slices/Travel/TravelSlice';
import { fetchTravelItemsByCategoryApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';

const DashboardCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
`;

const TravelItemsList = ({ category }: { category: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Get travel items for the specific category
  const travelItems = useSelector(selectTravelItemsByCategory(category));

  useEffect(() => {
    // Fetch items when component mounts or category changes
    dispatch(fetchTravelItemsByCategoryApi({ 
      category, 
      pageSize: 10, // Adjust as needed
      page: 1       // Start with page 1
    }));
  }, [dispatch, category]);

  return (
    <DashboardCard>
      <h2>{category} Packages</h2>
      {travelItems.length === 0 ? (
        <p>No {category} packages available</p>
      ) : (
        <ul>
          {travelItems.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              {/* Add more item details as needed */}
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
};

export default TravelItemsList;