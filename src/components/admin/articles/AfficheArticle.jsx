import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';


const AfficheArticle = () => {
  const { articles, isLoading, error } = useSelector((state) => state.storearticles)
  console.log(articles)
  
  
  return (
    <div>
        {isLoading ? (<h1>Chargement en cours ...</h1>): error ?(<h1>Erreur : {error}</h1>): (
            <Table striped bordered hover>
            <thead>
            <tr>         
                <th >Image</th>         
                <th>Référence</th>         
                <th>Désignation</th>         
                <th>Marque</th>         
                <th>Quantité</th>        
                <th>Prix</th>         
                <th>Modifier</th>         
                <th>Supprimer</th>     
            </tr> 
            </thead>
            <tbody>
             {articles.map((art, index) => 
             <tr key={index}>
                <td>
                  <img src ={art.imageart} width={80} height={80} />
                </td>                 
                <td>{art.reference}</td>                 
                <td>{art.designation}</td>                 
                <td>{art.marque}</td>                 
                <td>{art.qtestock}</td>                 
                <td>{art.prix}</td>                 
                <td><button className='edit'>                 
                    <i className="fa-solid fa-pen-to-square"></i>Update</button>
                </td>                      
                <td>
                    <button className="delete" >
                    <i class="fa-solid fa-trash"></i>Delete</button>
                </td>                  
            </tr> 
             )}
            </tbody>
          </Table>
        )}
    </div>
  )
}

export default AfficheArticle
