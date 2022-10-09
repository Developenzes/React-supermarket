import { useOutletContext } from "react-router-dom";

export default function ProductDetailNutrition() {
    const product = useOutletContext();
    const nutrition = product?.nutrition.mapValue.fields;
    
    return (
        <table className="table table-nutrition">
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Protein</td>
              <td>{nutrition.protein.integerValue}g</td>
            </tr>
            <tr>
              <td>Carbohydrates</td>
              <td>{nutrition.carbs.integerValue}g</td>
            </tr>
            <tr>
              <td>Fat</td>
              <td>{nutrition.fat.integerValue}g</td>
            </tr>
            <tr>
              <td>Salt</td>
              <td>{nutrition.salt.integerValue}g</td>
            </tr>
          </tbody>
        </table>
      );
}