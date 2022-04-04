/// <reference types="cypress" />

context("Name lish book", () => {
  beforeEach(() => {
    cy.visit("https://herodemo.autopair.co/");
  });
  it("Add Employee", () => {
    cy.login("007", "1234");
    AddTechincian();
    AddTechincian1();

    // checkTechincian();
  });
});

// เข้าหน้าเพิ่มพนักงาน
const AddTechincian = () => {
  cy.get("#nav-item-6").click();
  cy.get("#tab-employee").click({ force: true });
  cy.get("#btn-addEmp").click({ force: true });
};

// กรอกข้อมูลพนักงาน
const AddTechincian1 = () => {
  taxAddEmployee(getRandomNumberAddEmployee(1, 3));
  cy.get("#roleEmp").select("ช่างซ่อม");
  taxAddEmployee2(getRandomNumberAddEmployee(1, 5));
  taxAddEmployee1(getRandomNumberAddEmployee(1, 2));
  taxAddEmployee3(getRandomNumberAddEmployee(0, 10));
  cy.get("#state-password").type("password");
  cy.get('[success=""]').click();

  cy.get(".swal2-confirm").click();
};

const getRandomNumberAddEmployee = (min, max) => {
  0, 0;
  return Math.random() * (max - min) + min;
};
const taxAddEmployee = (textNo) => {
  cy.get("#state-nameEmp").type("ช่างซ่อม").type(textNo);
};
const taxAddEmployee1 = (textNo) => {
  cy.get("#state-usernameEmp").type("ช่างซ่อม").type(textNo);
};
const taxAddEmployee2 = (textNo) => {
  cy.get("#state-emailEmp")
    .type("ช่างซ่อม")
    .type(textNo)
    .type("@gmail.com");
};
const taxAddEmployee3 = (textNo) => {
  cy.get("#state-telEmp").type(textNo);
};

const checkTechincian = () => {
  cy.get("#nav-item-6").click();
  cy.get("#tab-employee").click({ force: true });

  cy.get(
    ".table-responsive > .table > tbody > :nth-child(1) > :nth-child(4) > .btn"
  ).click({ force: true });

  cy.get("#roleEmp").contains("ช่างซ่อม");

  cy.get(".mr-5").click({ force: true });
  cy.get("#tab-employee").click({ force: true });
};
