const SAMPLE_CUSTOMERS = [
    { CustomerID: "ALFKI", CompanyName: "Alfreds Futterkiste", Country: "Germany" },
    { CustomerID: "ANATR", CompanyName: "Ana Trujillo Emparedados", Country: "Mexico" },
    { CustomerID: "AROUT", CompanyName: "Around the Horn", Country: "United Kingdom" },
    { CustomerID: "BONAP", CompanyName: "Bon app'", Country: "France" },
    { CustomerID: "BSBEV", CompanyName: "B's Beverages", Country: "United Kingdom" },
    { CustomerID: "FRANK", CompanyName: "Frankenversand", Country: "Germany" },
    { CustomerID: "VINET", CompanyName: "Vins et alcools Chevalier", Country: "France" },
  ];
  
  const SAMPLE_ORDERS = [
    { OrderID: 10248, CustomerID: "VINET", OrderDate: "/Date(836434800000)/" },
    { OrderID: 10249, CustomerID: "VINET", OrderDate: "/Date(836521200000)/" },
    { OrderID: 10250, CustomerID: "ALFKI", OrderDate: "/Date(836602800000)/" },
    { OrderID: 10251, CustomerID: "BSBEV", OrderDate: "/Date(836689200000)/" },
    { OrderID: 10252, CustomerID: "FRANK", OrderDate: "/Date(836775600000)/" },
    { OrderID: 10253, CustomerID: "BONAP", OrderDate: "/Date(836862000000)/" },
  ];
  
  const SAMPLE_ORDER_DETAILS = [
    { OrderID: 10248, ProductName: "Queso Cabrales", UnitPrice: 14.0, Quantity: 12, Discount: 0.0 },
    { OrderID: 10248, ProductName: "Fried Mee", UnitPrice: 9.8, Quantity: 10, Discount: 0.0 },
  
    { OrderID: 10249, ProductName: "Tofu", UnitPrice: 18.6, Quantity: 9, Discount: 0.0 },
  
    { OrderID: 10250, ProductName: "Chai", UnitPrice: 14.4, Quantity: 10, Discount: 0.15 },
  
    { OrderID: 10251, ProductName: "Chang", UnitPrice: 15.2, Quantity: 6, Discount: 0.0 },
  
    { OrderID: 10252, ProductName: "Aniseed Syrup", UnitPrice: 8.0, Quantity: 40, Discount: 0.0 },
  
    { OrderID: 10253, ProductName: "Chef Anton's Seasoning", UnitPrice: 22.0, Quantity: 5, Discount: 0.0 },
  ];