import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Skeleton from "../../../components/Skeleton";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/Store";
import { usePieQuery } from "../../../redux/api/DashboardApi";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError, isLoading } = usePieQuery(user?._id || "");

  const charts = data?.charts ?? undefined;

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    charts?.orderFulfillment.processing || 0,
                    charts?.orderFulfillment.shipped || 0,
                    charts?.orderFulfillment.delivered || 0,
                  ]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={
                    charts?.ProductsCategories?.map((i) => Object.keys(i)[0]) ||
                    []
                  }
                  data={
                    charts?.ProductsCategories?.map(
                      (i) => Object.values(i)[0]
                    ) || []
                  }
                  backgroundColor={[
                    `hsl(111,80%, 80%)`,
                    `hsl(112,80%, 50%)`,
                    `hsl(113,40%, 50%)`,
                  ]}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[
                    (charts && charts?.StockAvailability.ProductsInStock) || 0,
                    (charts && charts?.StockAvailability.ProductsOutOfStock) ||
                      0,
                  ]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    charts?.revenueDistribution.marketingCost || 0,
                    charts?.revenueDistribution.discount || 0,
                    charts?.revenueDistribution.burnt || 0,
                    charts?.revenueDistribution.ProductionCost || 0,
                    charts?.revenueDistribution.netMargin || 0,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[
                    charts?.UsersAgeGroup.teen || 0,
                    charts?.UsersAgeGroup.adult || 0,
                    charts?.UsersAgeGroup.old || 0,
                  ]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[
                    charts?.Users.admins || 0,
                    charts?.Users.customers || 0,
                  ]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
