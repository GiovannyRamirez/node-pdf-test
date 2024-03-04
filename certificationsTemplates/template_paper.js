const getPaperTemplate = ({ 
    content, 
    header = { 
        content: "<h4>LIBERTY SEGUROS S.A.</h4><h4>CERTIFICAN:</h4>",
        style: {
            gap: "64px",
        }
    }
}) => {
    const paperTemplate = 
    `<style>
        .background-img {
            position: absolute;
            height: 95%;
            margin: 2.3% 1%;
            width: 96%;
        }
        .body-content {
            padding: 4% 12% 9%;
        }
        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }
        header {
            display: flex;
            flex-direction: column;
            gap: ${header.style.gap};
            margin: 120px 0 64px;
        }
        header, footer {
            text-align: center;
        }
        h4 {
            font-weight: 600;
            margin: 0;
        }
        main {
            text-align: justify;
        }
        p {
            margin-bottom: 18px;
        }
        .firma {
            margin-bottom: 4px;
        }
        .firma-img {
            width: 20%;
            border: 1px solid red;
        }
        footer {
            bottom: 6%;
            position: absolute;
            width: 76%;
        }
        span, a {
            color: #808080;
            font-size: 14px;
        }
        .day, .price {
            color: black;
            font-size: 16px;
            text-transform: capitalize;
        }
        a {
            display: inline;
            margin-right: 4px;
        }
        table {
            width: 100%;
        }
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            font-size: 11px;
        }
        td {
            text-align: center;
            width: fit-content;
            padding: 1px 4px;
        }
    </style>
    <body>    
        <img 
            class="background-img"
            src="pdfbackground.jpg" 
        />
        <main class="body-content">
        <section class="content">
        <header>    
            ${header.content}                    
        </header>
        <main>
            ${content}
        </main>
        
        </section>
        <footer>
            <span>
                Oficina Principal Calle 72 No. 10-07 Bogotá D.C - Colombia Tel: 3103300
            </span>
            <br>
            <a href="www.libertyseguros.co">
                www.libertyseguros.co
            </a>
            <span>
                NIT. 860.039.988-0
            </span>
        </footer>
        </main>
    </body>`;

    return paperTemplate;
};

module.exports = {
    paperTemplate: getPaperTemplate,
};
