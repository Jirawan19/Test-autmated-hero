/// <reference types="cypress" />

context("part_po", () => {
    it("quotation part", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        // add_part()
        quotation()
    })
    it("start_job", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");

        start_job()
    })
    it("start_job1", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        start_job1()
        check_job()
    })
})
const add_part = () => {
    cy.get("#nav-item-6").click({ force: true });
    cy.get("#tab-inventory").click({ force: true });
    cy.get("#btn-addInventory").click({ force: true });
    cy.get("#tab-PART").click({ force: true });

    taxParts(getRandomNumberParts(1, 10));
    cy.get("#fitmentDetail").click().type("{downarrow}{enter}");
    taxParts1(getRandomNumberParts(1, 10));
    taxParts2(getRandomNumberParts(1, 10));
    taxParts3(getRandomNumberParts(1, 10));
    cy.get("#itemDescription").type("test");

    cy.get("#btnNextPart").click();

    cy.get("#amountRemainStock").clear().type("100");
    cy.get("#unit").click().type("{downarrow}{enter}");
    cy.get('.form-row.mt-2 > .form-group > .mt-2 > #salesPricePart').clear().type("200");
    cy.get("#btnsaveInventoryPart").click();

    cy.get(".swal2-confirm").click();
    cy.get("#tab-PART").click({ force: true });
}
const getRandomNumberParts = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};

const taxParts = (textNo) => {
    cy.get("#itemName").type("เพิ่มอะไหล่").type(textNo);
};
const taxParts1 = (textNo) => {
    cy.get("#brand").type("เพิ่มอะไหล่").type(textNo);
};
const taxParts2 = (textNo) => {
    cy.get("#manufacturerNo").type("เพิ่มอะไหล่").type(textNo);
};
const taxParts3 = (textNo) => {
    cy.get("#oeNo").type("เพิ่มอะไหล่").type(textNo);
};
const quotation = () => {
    cy.get('#nav-item-2').click()
    cy.get('#tab-quotation').click({ force: true })

    cy.wait(2000)
    cy.get('#btn-addRepairJob').click({ force: true })
    cy.wait(1000)
    cy.get('#selSelectCar').click({ force: true }).type("9", { force: true }).wait(1000).type("{downarrow}{enter}", { force: true })

    // เพิ่มสินค้า
    cy.get('.col-xl-3 > .btn').click({ force: true })
    cy.get('#tab-PART').click({ force: true })
    cy.get('#openModelAddSpare').click({ force: true })
    cy.get('#partName').click().type("อะไหล่ ro")
    taxManufac(getRandomNumberManufac(0, 10))
    cy.get('#brandName').click().type("ro")
    cy.get('#pricePart').click().clear().type("200")
    cy.get('#detailPart').click().type("ใบเสนอราคาอะไหล่ ro")
    cy.get('#btnAddRoPart').click()
    cy.get('#Product > .modal-dialog > .modal-content > .modal-header > .close').click()

    //เช็คสินค้า
    cy.get('#listRoItem-0 > #listRoItemdata-0').should("contain.text", "อะไหล่ ro")

    // ส่วนลดรายชิ้น
    cy.get(':nth-child(6) > .row > .mt-3 > .form-control').click({ force: true }).clear({ force: true }).type("5", { force: true })

    // เช็คราคา
    cy.get('#pricetotal').should("contain.text", "190.00")
    cy.get('#afterDiscount').should("contain.text", "190.00")
    cy.get('#paymentPrice').should("contain.text", "203.30")

    check()

    // เปิดใบเสนอราคา
    cy.get('#btncreateQuotation').click()
    cy.get('.swal2-confirm').click()

    // เช็ครายการใบเสนอราคา
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(5)').should("contain.text", "190.00")
    cy.get('#jobrepair-0 > :nth-child(8) > .status-border').should("contain.text", "รอลูกค้ายืนยัน")
}
const getRandomNumberManufac = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxManufac = (textNo) => {
    cy.get('#Manufacturer').click().type(textNo);
};
const check = () => {
    const job = [
        {
            price: 200,
            qty: 1,
            discount: 10,
        }
    ]

    // ราคาทั้งหมด
    let Price = 0
    job.map(job => {
        Price += job.price * job.qty
    })
    // ส่วนลดรายชิ้น
    let discount = 0
    job.map(job => {
        discount += (job.price * job.qty) - job.discount
    })
    // // ส่วนลดท้ายบิล ถ้ามี
    // let job_discount = 0
    // job.map(job => {
    //     job_discount += (job.price - job.discount) * (100 - 10) / 100
    // })

    // ราคาบวก vat ท้ายบิล
    let paymentPrice = 0
    job.map(job => {
        paymentPrice += ((job.price * job.qty) - job.discount) * 1.07
    })

    cy.log(Price)
    cy.log(discount)
    // cy.log(job_discount)
    cy.log(paymentPrice)

    cy.get('#afterDiscount').should("contain.text",discount)
    cy.get('#paymentPrice').should("contain.text",paymentPrice)
}
// เปิดงานซ่อมบำรุงจากใบเสนอราคา
const start_job = () => {
    cy.wait(1000)
    cy.visit("https://herodemo.autopair.co/workshop/quotation/info/100")
    cy.wait(1000)

    // สถานะรอลูกค้ายืนยัน
    cy.get('.status-border').should("contain.text", "รอลูกค้ายืนยัน")
    cy.get('#rolistdata-0').should("contain.text", "อะไหล่ ro")
    cy.get('#rolistdescription-0').should("contain.text", "ใบเสนอราคาอะไหล่ ro")
    cy.get('#totalPrice').should("contain.text", "190.00")
    cy.get('#afterDiscount').should("contain.text", "190.00")
    cy.get('#paymentPrice').should("contain.text", "203.30")

    check()

    cy.get('#btngotoCreate').click()

    // ใส่ข้อมูลพนักงานซ่อม
    cy.get('#selSelectmechanicId').click({ force: true }).type("ช่างซ่อม", { force: true }).type("{downarrow}{downarrow}{enter}", { force: true })

    cy.get('#listRoItem-0 > #listRoItemdata-0').should("contain.text","อะไหล่ ro")
    cy.get('#partproductlatestSalePricetotal-0').should("contain.text","190.00")
    cy.get('#afterDiscount').should("contain.text","190.00")
    cy.get('#paymentPrice').should("contain.text","203.30")
    check()

    // เปิดงานซ่อม
    cy.get('#btncreateWalkInWorkshopJob').click({ force: true })
    cy.get('.swal2-confirm').click()

    // เช็คเปิดงานซ่อมจากใบเสนอราคา
    cy.get('#tab-งานซ่อม').click({ force: true })
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(6)').should("contain.text", "203.30")
    cy.get('#jobrepair-0 > [style="width: 12rem;"] > .status-border').should("contain.text", "รอซ่อมบำรุง")
}
const start_job1 = () => {
    cy.wait(1000);
    cy.visit("https://herodemo.autopair.co/workshop/jobs/ATH-00294-0322-0053")
    cy.wait(1000);

    // สถานะรอซ่อมบำรุง
    cy.get('.status-border').should("contain.text","รอซ่อมบำรุง")
    cy.get('#rolistdata-0').should("contain.text","อะไหล่ ro")
    cy.get('#rolistdescription-0').should("contain.text", "ใบเสนอราคาอะไหล่ ro")
    cy.get('#totalPrice').should("contain.text","190.00")
    cy.get('#afterDiscount').should("contain.text","190.00")
    cy.get('#paymentPrice').should("contain.text","203.30")
    check()

    cy.get('#btnrecheckConfirmstart').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500);
    cy.get('.swal2-confirm').click()

    // สถานะกำลังซ่อมบำรุง
    cy.get('.status-border').should("contain.text","กำลังซ่อมบำรุง")
    cy.get('#rolistdata-0').should("contain.text","อะไหล่ ro")
    cy.get('#rolistdescription-0').should("contain.text", "ใบเสนอราคาอะไหล่ ro")
    cy.get('#totalPrice').should("contain.text","190.00")
    cy.get('#afterDiscount').should("contain.text","190.00")
    cy.get('#paymentPrice').should("contain.text","203.30")
    check()

    cy.get('#paymentModal').click()
    cy.get('#btnrecheckConfirmfinish').click()
    cy.get('.swal2-confirm').click()
    cy.wait(2000)
    cy.get('.swal2-confirm').click()

    // รับสินค้า ro เข้าคลัง
    cy.get('#btnrecheckUpdateInventory').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()

    // สถานะซ่อมบำรุงเสร็จสิ้น
    cy.get('.status-border').should("contain.text","รายการเสร็จสิ้น")
    cy.get('#rolistdata-0').should("contain.text","อะไหล่ ro")
    cy.get('#rolistdescription-0').should("contain.text", "ใบเสนอราคาอะไหล่ ro")
    cy.get('#totalPrice').should("contain.text","190.00")
    cy.get('#afterDiscount').should("contain.text","190.00")
    cy.get('#paymentPrice').should("contain.text","203.30")
    check()

    cy.get('#btnBack').click()
}
const check_job = () => {
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text","ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(6)').should("contain.text","203.30")
    cy.get('#jobrepair-0 > [style="width: 12rem;"] > .status-border').should("contain.text","รายการเสร็จสิ้น")
}