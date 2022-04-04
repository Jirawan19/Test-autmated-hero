/// <reference types="cypress" />


context("Name lish book", () => {
    it("Add Employee", () => {
        cy.login("007", "1234")
        AddHead()
        AddHead1()

        // checkHead()
    })
})

// เข้าหน้าเพิ่มพนักงาน
const AddHead = () => {
    cy.get('#nav-item-6').click()
    cy.get('#tab-employee').click({ force: true })
    cy.wait(500)
    cy.get('#btn-addEmp')
        .click({ force: true })
}

// กรอกข้อมูลพนักงาน
const AddHead1 = () => {
    taxAddEmployee(getRandomNumberAddEmployee(1, 3))
    cy.get('#roleEmp').select("แอดมิน")
    taxAddEmployee2(getRandomNumberAddEmployee(1, 5))
    taxAddEmployee1(getRandomNumberAddEmployee(1, 2))
    taxAddEmployee3(getRandomNumberAddEmployee(0, 10))
    cy.get('#state-password').type("password")
    cy.get('[success=""]').click()

    cy.get('.swal2-confirm').click()

}

const getRandomNumberAddEmployee = (min, max) => {
    0, 0
    return Math.random() * (max - min) + min;
}
const taxAddEmployee = (textNo) => {
    cy.get('#state-nameEmp')
        .type("แอดมิน").type(textNo)
}
const taxAddEmployee1 = (textNo) => {
    cy.get('#state-usernameEmp')
        .type("แอดมิน").type(textNo)
}
const taxAddEmployee2 = (textNo) => {
    cy.get('#state-emailEmp')
        .type("แอดมิน").type(textNo).type("@gmail.com")

}
const taxAddEmployee3 = (textNo) => {
    cy.get('#state-telEmp')
        .type(textNo)
}

const checkHead = () => {
    cy.get('#nav-item-6').click()
    cy.get('#tab-employee').click({ force: true })

    cy.get('.table-responsive > .table > tbody > :nth-child(1) > :nth-child(4) > .btn')
        .click({ force: true })

    cy.get('#roleEmp')
        .contains("แอดมิน")

    cy.get('.mr-5').click({ force: true })

    cy.get('#tab-employee')
        .click({ force: true })
}