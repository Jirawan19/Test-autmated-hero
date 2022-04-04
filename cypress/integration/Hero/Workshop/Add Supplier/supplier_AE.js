/// <reference types="cypress" />

context("supplier_AE", () => {
    it("supplier_AE", () => {
        cy.login("AE1", "password")
        add_supplier()
        check_supplier()
    })
})
const add_supplier = () => {
    cy.get(':nth-child(5) > .btn').click({ force: true })
    taxAdd_supplier(texRandomAdd_supplier(0, 1e2))
    taxAdd_supplier1(texRandomAdd_supplier(0, 1e13))
    taxAdd_supplier2(texRandomAdd_supplier(0, 1e2))
    cy.get('#txtInputAddress_AddressName').click({ force: true }).type("หมู่บ้านพลีโน่")
    cy.get(':nth-child(7) > .vth-addr-container > .vth-addr-input-container > .vth-addr-input')
        .click({ force: true }).type("10220").type("{downarrow}{downarrow}{enter}", { force: true });
    cy.get('#first-name').click({ force: true }).type("น้ำ")
    taxAdd_supplier3(texRandomAdd_supplier(0, 1e2))
    taxAdd_supplier4(texRandomAdd_supplier(0, 1e10))
    taxAdd_supplier5(texRandomAdd_supplier(0, 1e2))
    cy.get('#password').click().type("1234")

    cy.get('.action-save').click()
    cy.get('.swal2-confirm').click()
}

const texRandomAdd_supplier = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxAdd_supplier = (textNo) => {
    cy.get('#txtWorkshop_Name').click({ force: true }).type("ทดสอบชื่ออู่ ").type(textNo);
};
const taxAdd_supplier1 = (textNo) => {
    cy.get('#nbrWorkshop_Tax').click({ force: true }).type(textNo);
};
const taxAdd_supplier2 = (textNo) => {
    cy.get('#txtInp_Name_Company').click({ force: true }).type("ทดสอบชื่อบริษัท ").type(textNo);
};
const taxAdd_supplier3 = (textNo) => {
    cy.get('#last-name').click({ force: true }).type("ทดสอบ").type(textNo);
};
const taxAdd_supplier4 = (textNo) => {
    cy.get('#telNo').click({ force: true }).type(textNo);
};
const taxAdd_supplier5 = (textNo) => {
    cy.get('#username_employee').click({ force: true }).type("test").type(textNo);
};

const check_supplier = () => {
    cy.get('#customer-0 > .align-middle').contains("ทดสอบชื่ออู่")
    cy.get('#customer-0 > :nth-child(2)').contains("หมู่บ้านพลีโน่ คลองถนน สายไหม กรุงเทพมหานคร 10220")
}