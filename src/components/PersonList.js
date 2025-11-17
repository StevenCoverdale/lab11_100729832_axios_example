import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, Button, Container, Spinner } from 'react-bootstrap';

const fetchUsers = async () => {
  const res = await axios.get('https://randomuser.me/api/?results=10');
  return res.data.results;
};

function PersonList() {
  const { data: persons, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  if (isLoading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="text-center mt-5"><p>Error fetching users</p></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User List</h2>
      {persons.map((person, index) => (
        <Card key={index} className="mb-3">
          <div className="d-flex p-3 align-items-center">
            <img
              src={person.picture.large}
              alt="User"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px',
                flexShrink: 0,
                marginRight: '20px'
              }}
            />
            <div>
              <h5>{person.name.title} {person.name.first} {person.name.last}</h5>
              <p className="mb-1"><strong>Username:</strong> {person.login.username}</p>
              <p className="mb-1"><strong>Gender:</strong> {person.gender}</p>
              <p className="mb-1"><strong>Email:</strong> {person.email}</p>
              <p className="mb-1"><strong>Phone:</strong> {person.phone}</p>
              <p className="mb-1"><strong>Location:</strong> {person.location.city}, {person.location.country}</p>
              <Button variant="primary" size="sm">Details</Button>
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
}

export default PersonList;